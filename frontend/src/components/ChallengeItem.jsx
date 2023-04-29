import { useDispatch } from "react-redux";
import { deleteChallenge } from "../features/challenges/challengeSlice";

function ChallengeItem({ challenge }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <h2>{challenge.name}</h2>
      <div>id {challenge.id}</div>
      <div>Start Date: {challenge.start_date.slice(0, 10)}</div>
      <div>End Date: {challenge.end_date.slice(0, 10)}</div>
      <div>Completed pages: {challenge.completed_pages}</div>
      <div>total pages: {challenge.total_pages}</div>
      <div>satus: {challenge.status}</div>

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
