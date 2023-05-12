import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getMyClubs, reset } from "../features/myClubs/myClubSlice";
import ClubItem from "../components/ClubItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
    <>
      <Container>
        <Row>
          <Col>
            <h1>Welcome {user && user.username}</h1>
            <p>Your Clubs List</p>
          </Col>
        </Row>
        <Row>
          {myClubs.map((club) => (
            <Col sm={12} key={club.id}>
              <ClubItem club={club} isJoined={true} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default MyClubs;
