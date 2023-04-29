import { useDispatch } from "react-redux";
import { deleteChallenge } from "../features/challenges/challengeSlice";

function ChallengeItem({ challenge }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div>{challenge.start_date.slice(0, 10)}</div>
      <h2>{challenge.name}</h2>
      <button
        className="close"
        onClick={() => dispatch(deleteChallenge(challenge.id))}
      >
        X
      </button>
    </div>
  );
}

export default ChallengeItem;
