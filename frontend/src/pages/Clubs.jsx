import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllClubs, reset } from "../features/clubs/clubSlice";
import ClubItem from "../components/ClubItem";
import { getMyClubs } from "../features/myClubs/myClubSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Clubs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { clubs, isLoading, isError, message } = useSelector(
    (state) => state.clubs
  );
  const { myClubs } = useSelector((state) => state.myClubs);

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
          // paddingLeft: 20,
          textAlign: "center",
        }}
      >
        Clubs
      </h2>

      {/* if the club is fined in myclubs array give it a prop isJoined=true  else 
          give it a prop isJoined=false */}

      {clubs.length > 0 &&
        clubs.map((club) => (
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
        ))}
    </div>
  );
}

export default Clubs;
