import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllClubs, reset, createClub } from "../features/clubs/clubSlice";
import ClubItem from "../components/ClubItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import ClubForm from "../components/ClubForm";

function Clubs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isCreating, setIsCreating] = useState(false);

  const {
    user,
    isLoading: userLoading,
    isError: userError,
  } = useSelector((state) => state.auth);
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

    if (!user && !userLoading && !userError) {
      navigate("/login");
    }

    dispatch(getAllClubs());

    return () => {
      dispatch(reset());
    };
  }, [user, userLoading, userError, navigate, isError, message, dispatch]);

  useEffect(() => {
    const filteredClubs = clubs.filter((club) =>
      club.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredMyClubs = myClubs.filter((club) =>
      club.name.toLowerCase().includes(query.toLowerCase())
    );

    const combinedResults = [...filteredClubs, ...filteredMyClubs];

    const uniqueResults = combinedResults.reduce((acc, current) => {
      const isDuplicate = acc.some((item) => item.id === current.id);
      if (!isDuplicate) {
        acc.push(current);
      }

      return acc;
    }, []);
    setFilteredResults(uniqueResults);
  }, [query, clubs, myClubs]);

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handleCreateClub = (clubData) => {
    dispatch(createClub(clubData));
  };

  if (isLoading || userLoading) {
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
      <div style={{ margin: "0 auto", width: "30rem" }}>
        {isCreating && (
          <ClubForm onCancel={handleCancelCreate} onCreate={handleCreateClub} />
        )}
      </div>

      {isCreating && (
        <div
          className="cancel_Div"
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
          <Button
            style={{
              backgroundColor: "#37383c",
              borderColor: "#878a94",
              color: "#fff",
              marginBottom: 20,
            }}
            onClick={() => {
              setIsCreating(false);
              dispatch(getAllClubs());
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      {!isCreating && (
        <>
          <div
            className="searchBox"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: 1224,
              width: "80%",
            }}
          >
            <div
              className="mb-3"
              controlId="formBasicEmail"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: 1224,
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
            {!isCreating && (
              <Button
                variant="primary"
                onClick={() => setIsCreating(true)}
                style={{
                  marginBottom: "1rem",

                  // a suitable color for a create button
                  backgroundColor: "#37383c",
                  borderColor: "#878a94",
                  color: "#fff",
                }}
              >
                {/* plus icon from font awsome */}
                <FaPlus />
              </Button>
            )}
          </div>
          {filteredResults.length > 0 ? (
            <Row>
              {filteredResults.map((club) => (
                <Col sm={12} key={club.id}>
                  <ClubItem
                    club={club}
                    isJoined={myClubs.some(
                      (joinedClub) => joinedClub.id === club.id
                    )}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <h3
              style={{
                color: "#fff",
                textAlign: "center",
              }}
            >
              No clubs found.
            </h3>
          )}
        </>
      )}
    </div>
  );
}

export default Clubs;
