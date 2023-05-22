import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllClubs, reset } from "../features/clubs/clubSlice";
import ClubItem from "../components/ClubItem";
import { getMyClubs } from "../features/myClubs/myClubSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import form, button and fasearch
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";

function Clubs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { clubs, isLoading, isError, message } = useSelector(
    (state) => state.clubs
  );
  const { myClubs } = useSelector((state) => state.myClubs);

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (isError && clubs.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getAllClubs());
    dispatch(getMyClubs());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    // Filter the clubs and myClubs based on the search query
    const filteredClubs = clubs.filter((club) =>
      club.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredMyClubs = myClubs.filter((club) =>
      club.name.toLowerCase().includes(query.toLowerCase())
    );

    // Combine the filtered clubs and myClubs into a single array
    const combinedResults = [...filteredClubs, ...filteredMyClubs];

    // Remove duplicates from the combined array based on club ID
    const uniqueResults = combinedResults.reduce((acc, current) => {
      const isDuplicate = acc.some((item) => item.id === current.id);
      if (!isDuplicate) {
        acc.push(current);
      }

      return acc;
    }, []);
    setFilteredResults(uniqueResults);
  }, [query, clubs, myClubs]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="club_cards_container">
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
        Clubs
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
            placeholder="Search for a club..."
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

      {/* Render the filtered clubs */}
      {filteredResults.length > 0 ? (
        filteredResults.map((club) => (
          <Col sm={12} key={club.id}>
            <ClubItem
              club={club}
              isJoined={
                myClubs.find((joinedClub) => joinedClub.id === club.id)
                  ? true
                  : false
              }
            />
          </Col>
        ))
      ) : (
        <p>No clubs found.</p>
      )}
    </div>
  );
}

export default Clubs;
