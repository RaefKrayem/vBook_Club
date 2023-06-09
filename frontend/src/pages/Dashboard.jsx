import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getAllChallenges, reset } from "../features/challenges/challengeSlice";
import ChallengeForm from "../components/Challenge/ChallengeForm";
import ChallengeItem from "../components/Challenge/ChallengeItem";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Challenges.css";

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
    <div className="challenges-container">
      <h2 className="challenges-heading">Challenges Dashboard</h2>

      <section>
        <Container>
          <Row>
            <Col lg={4}>
              <ChallengeForm />
            </Col>

            <Col
              lg={8}
              style={{
                // let it be a scrollable div
                overflowY: "scroll",
                height: "70vh",
              }}
            >
              {challenges.length > 0 ? (
                <Row>
                  {challenges
                    .filter((challenge) => challenge.status === "in progress")
                    .map((challenge) => (
                      <Col
                        key={challenge.id}
                        xs={12}
                        md={6}
                        lg={6}
                        className="challenge-item"
                      >
                        <ChallengeItem challenge={challenge} />
                      </Col>
                    ))
                    .concat(
                      challenges
                        .filter((challenge) => challenge.status === "completed")
                        .map((challenge) => (
                          <Col
                            key={challenge.id}
                            xs={12}
                            md={6}
                            lg={6}
                            className="challenge-item"
                          >
                            <ChallengeItem challenge={challenge} />
                          </Col>
                        ))
                    )
                    .concat(
                      challenges
                        .filter((challenge) => challenge.status === "failed")
                        .map((challenge) => (
                          <Col
                            key={challenge.id}
                            xs={12}
                            md={6}
                            lg={6}
                            className="challenge-item"
                          >
                            <ChallengeItem challenge={challenge} />
                          </Col>
                        ))
                    )}
                </Row>
              ) : (
                <>
                  <h3
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                  >
                    Start New Challenges
                  </h3>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Dashboard;
