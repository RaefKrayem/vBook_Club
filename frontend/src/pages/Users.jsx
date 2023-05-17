import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getUsers, reset } from "../features/users/userSlice";
import { getFriends } from "../features/friends/friendSlice";
import UserItem from "../components/UserItem";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/User.css";

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );
  const { friends } = useSelector((state) => state.friends);

  const [limit, setLimit] = useState(12);

  const loadMore = () => {
    setLimit(limit + 12);
  };

  useEffect(() => {
    if (isError && users.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getUsers());
    dispatch(getFriends());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

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
            // paddingLeft: 20,
            textAlign: "center",
          }}
        >
          Users
        </h2>

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
            {users.length > 0 &&
              users
                .filter(
                  (user) => !friends.find((friend) => friend.id === user.id)
                )
                .slice(0, limit)
                .map((user) => (
                  <Col key={user.id}>
                    <UserItem user={user} isFriend={false} />
                  </Col>
                ))}

            {friends.length > 0 &&
              friends.map((friend) => (
                <Col key={friend.id}>
                  <UserItem user={friend} isFriend={true} />
                </Col>
              ))}

            {users.length > limit && (
              <Col xs={12} className="text-center">
                <Button variant="primary" onClick={loadMore}>
                  Load More
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Users;
