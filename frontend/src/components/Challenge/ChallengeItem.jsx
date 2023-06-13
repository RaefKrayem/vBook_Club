import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChallenge } from "../../features/challenges/challengeSlice";
import ChallengeEditForm from "./ChallengeEditForm";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/Challenge.css";

import {
  FaPencilAlt,
  FaTrashAlt,
  FaBookOpen,
  FaHourglassStart,
  FaHourglassEnd,
  FaLongArrowAltRight,
} from "react-icons/fa";

function ChallengeItem({ challenge }) {
  const progressStyle = {
    backgroundImage:
      "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)",
    backgroundSize: "1rem 1rem",
  };

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

  // round the progress
  const progress =
    Math.round((challenge.completed_pages / challenge.total_pages) * 100) || 0;

  let icon;
  let iconColor;
  if (challenge.status === "completed") {
    icon = faCheckCircle;
    iconColor = "green";
  } else if (challenge.status === "failed") {
    icon = faTimesCircle;
    iconColor = "red";
  } else {
    icon = faCircle;
    iconColor = "blue";
  }

  return (
    <div
      className="challenge_container"
      style={{
        height: "100%",
      }}
    >
      <div className="challenge_content">
        <div className="challenge_head">
          <h5>{challenge.name}</h5>

          <div className="challenge_buttons">
            {!isEditing ? (
              <>
                {challenge.status === "in progress" && (
                  <button className="challenge_edit" onClick={handleEdit}>
                    <FaPencilAlt />
                  </button>
                )}

                <button className="challenge_delete" onClick={handleDelete}>
                  <FaTrashAlt />
                </button>
              </>
            ) : (
              <>
                <button className="challenge_cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        <div className="challenge_body">
          {!isEditing ? (
            <>
              <div className="challenge_dates">
                <p>
                  {" "}
                  <FaHourglassStart style={{ marginRight: "0.5rem" }} />
                  {new Date(challenge.start_date).toLocaleDateString()}
                </p>
                <span>
                  <FaLongArrowAltRight style={{ fontSize: "2rem" }} />
                </span>
                <p>
                  {new Date(challenge.end_date).toLocaleDateString()}
                  <FaHourglassEnd style={{ marginLeft: "0.5rem" }} />
                </p>
              </div>
              <div className="challenge_completed_pages">
                {" "}
                <FaBookOpen style={{ marginRight: "0.5rem" }} />
                Completed:
                {" " + challenge.completed_pages + " "}/
                {" " + challenge.total_pages}
              </div>
              <div className="challenge_state">
                <p>
                  <FontAwesomeIcon
                    icon={icon}
                    style={{ color: iconColor, marginRight: "0.5rem" }}
                  />
                  {/* upper case the challenge status */}
                  {challenge.status.charAt(0).toUpperCase() +
                    challenge.status.slice(1)}
                </p>

                <ProgressBar
                  now={progress}
                  label={`${progress}%`}
                  style={progressStyle}
                />
              </div>
            </>
          ) : (
            <ChallengeEditForm challenge={challenge} onCancel={handleCancel} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengeItem;
