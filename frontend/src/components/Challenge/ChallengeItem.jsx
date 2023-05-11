import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChallenge } from "../../features/challenges/challengeSlice";
import ChallengeEditForm from "./ChallengeEditForm";

function ChallengeItem({ challenge }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="goal">
      <h2>{challenge.name}</h2>
      <div>id {challenge.id}</div>
      <div>Start Date: {challenge.start_date.slice(0, 10)}</div>
      <div>End Date: {challenge.end_date.slice(0, 10)}</div>
      <div>Completed pages: {challenge.completed_pages}</div>
      <div>total pages: {challenge.total_pages}</div>
      <div>
        Remaining Pages: {challenge.total_pages - challenge.completed_pages}
      </div>
      <div>Time left: </div>
      <div>status: {challenge.status}</div>

      <button
        className="close"
        onClick={() => dispatch(deleteChallenge(challenge.id))}
      >
        X
      </button>

      {challenge.status === "in progress" ? (
        <button className="edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      ) : (
        <></>
      )}

      {isEditing && <ChallengeEditForm challenge={challenge} />}
    </div>
  );
}

export default ChallengeItem;
