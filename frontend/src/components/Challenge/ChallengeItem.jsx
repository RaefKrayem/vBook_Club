import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChallenge } from "../../features/challenges/challengeSlice";
import ChallengeEditForm from "./ChallengeEditForm";
import { Card, Button } from "react-bootstrap";

function ChallengeItem({ challenge }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteChallenge(challenge.id));
  };

  return (
    <Card
      className="mb-3"
      style={{
        backgroundColor: "#d0ab7f",
        color: "#8e2b32",
        height: "100%",
      }}
    >
      <Card.Body>
        {isEditing ? (
          <ChallengeEditForm challenge={challenge} onCancel={handleCancel} />
        ) : (
          <>
            <Card.Title>{challenge.name}</Card.Title>
            <Card.Text>
              Start Date: {challenge.start_date.slice(0, 10)} <br />
              End Date: {challenge.end_date.slice(0, 10)} <br />
              Completed Pages: {challenge.completed_pages} <br />
              Total Pages: {challenge.total_pages} <br />
              Remaining Pages:{" "}
              {challenge.total_pages - challenge.completed_pages}
              <br />
              Time Left: <br />
              Status: {challenge.status}
            </Card.Text>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>{" "}
            {challenge.status === "in progress" && (
              <>
                <Button variant="secondary" onClick={handleEdit}>
                  Edit
                </Button>
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ChallengeItem;
