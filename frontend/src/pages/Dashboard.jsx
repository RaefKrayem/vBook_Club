import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// to check if the user exists in the local storage to navigate him to local storage
import { useSelector, useDispatch } from "react-redux";
import ChallengeForm from "../components/ChallengeForm";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getAllChallenges, reset } from "../features/challenges/challengeSlice";
import ChallengeItem from "../components/ChallengeItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { challenges, isLoading, isError, message } = useSelector(
    (state) => state.challenges
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate("/login");

    // get all challenges and put it in challenges variable above to be used in the return
    dispatch(getAllChallenges());

    // when the component unmounts, reset the challenges state by returning a function from useEffect
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Challenges Dashboard</p>
      </section>
      <ChallengeForm />

      <section className="content">
        {challenges.length > 0 ? (
          <div className="goals">
            {challenges.map((challenge) => (
              <ChallengeItem
                key={challenge._id || challenge.id}
                challenge={challenge}
              />
            ))}
          </div>
        ) : (
          <h3>You have not set any challenges</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
