import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getUsers, reset } from "../features/users/userSlice";
import { getFriends } from "../features/friends/friendSlice";
import UserItem from "../components/UserItem";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../styles/User.css";

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );
  const { friends } = useSelector((state) => state.friends);

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    if (isError && users.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getUsers());
    dispatch(getFriends());
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    // Filter the users and friends based on the search query
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    const filteredFriends = friends.filter((friend) =>
      friend.username.toLowerCase().includes(query.toLowerCase())
    );

    // Combine the filtered users and friends into a single array
    const combinedResults = [...filteredUsers, ...filteredFriends];

    // Remove duplicates from the combined array based on user ID
    const uniqueResults = combinedResults.reduce((acc, current) => {
      const isDuplicate = acc.some((item) => item.id === current.id);
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    setFilteredResults(uniqueResults);
  }, [query, users, friends]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section
        className="content"
        style={{
          backgroundColor: "#1d1e20",
          paddingTop: 20,
        }}
      >
        <h2
          style={{
            fontWeight: 500,
            fontSize: 32,
            lineHeight: "40px",
            color: "#fff",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Users
        </h2>

        {/* Add a search bar */}
        <div className="searchBox">
          <div
            className="mb-3"
            controlId="formBasicEmail"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 1224,
              paddingLeft: 200,
              paddingRight: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Form.Control
              type="text"
              placeholder="Search for a user..."
              value={query}
              style={{
                backgroundColor: "#37383c",
                borderColor: "#878a94",
                color: "#fff",
                width: "30rem",
              }}
              onChange={handleSearchChange}
            />
            <Button
              type="button"
              style={{
                backgroundColor: "transparent",
                border: "none",
                borderColor: "#878a94",
                color: "#fff",
              }}
            >
              <FaSearch
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              />
            </Button>
          </div>
        </div>

        <Container
          fluid
          className="users-container"
          style={{
            margin: "0 auto",
            maxWidth: "85%",
            padding: "0 1rem",
            width: "100%",
          }}
        >
          <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={5} g={6}>
            {filteredResults.map((result) => (
              <Col key={result.id}>
                <UserItem
                  user={result}
                  isFriend={friends.some((friend) => friend.id === result.id)}
                />
              </Col>
            ))}
          </Row>
          {filteredResults.length > limit && (
            <div className="text-center mt-4">
              <Button>Load More</Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default Users;
