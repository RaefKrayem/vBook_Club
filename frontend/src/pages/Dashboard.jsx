import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getAllChallenges, reset } from "../features/challenges/challengeSlice";
import ChallengeForm from "../components/Challenge/ChallengeForm";
import ChallengeItem from "../components/Challenge/ChallengeItem";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { challenges, isLoading, isError, message } = useSelector(
    (state) => state.challenges
  );

  useEffect(() => {
    if (isError && challenges.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getAllChallenges());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        backgroundColor: "#8e2b32",
      }}
    >
      <section className="heading">
        <p
          style={{
            color: "#dcdcdc",
          }}
        >
          Challenges Dashboard
        </p>
      </section>

      <section className="content">
        <Container>
          <Row>
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <Col key={challenge.id} xs={12} md={6} lg={4}>
                  <ChallengeItem challenge={challenge} />
                </Col>
              ))
            ) : (
              <h3>You have not set any challenges</h3>
            )}
          </Row>
          <Row>
            <Col>
              <ChallengeForm />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Dashboard;
