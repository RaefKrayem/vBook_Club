import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getMyClubs, reset } from "../features/myClubs/myClubSlice";
import ClubItem from "../components/ClubItem";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function MyClubs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { myClubs, isLoading, isError, message } = useSelector(
    (state) => state.myClubs
  );

  useEffect(() => {
    if (isError && myClubs.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    // get all friends and put it in friends variable above to be used in the return
    dispatch(getMyClubs());

    // when the component unmounts, reset the friends state by returning a function from useEffect
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
        My Clubs
      </h2>

      {myClubs.map((club) => (
        <Col sm={12} key={club.id}>
          <ClubItem club={club} isJoined={true} />
        </Col>
      ))}
    </div>
  );
}

export default MyClubs;
