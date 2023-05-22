import {
  FaPencilAlt,
  FaTrashAlt,
  FaClock,
  FaBookOpen,
  FaHourglassStart,
  FaHourglassEnd,
  FaLongArrowAltRight,
} from "react-icons/fa";
import "../styles/BardLogin.css";

const BardLogin = () => {
  return (
    // <div className="challenge_container">
    //   <div className="challenge_card">
    //     <h5>
    //       Challenge Name
    //       <div className="challenge_btn-group">
    //         <button className="challenge_btn-edit">
    //           <FaPencilAlt />
    //         </button>
    //         <button className="challenge_btn-delete">
    //           <FaTrashAlt />
    //         </button>
    //       </div>
    //     </h5>
    //     <div className="challenge_progress-container">
    //       <div className="challenge_progress">
    //         <div
    //           className="challenge_progress-bar"
    //           role="progressbar"
    //           style={{ width: "70%" }}
    //           aria-valuenow="70"
    //           aria-valuemin="0"
    //           aria-valuemax="100"
    //         ></div>
    //       </div>
    //     </div>
    //     <div className="challenge_challenge-content">
    //       <p>
    //         <strong>
    //           <FaClock />
    //         </strong>{" "}
    //         10 days
    //       </p>
    //       <p>
    //         <strong>
    //           <FaBookOpen />
    //         </strong>{" "}
    //         7 remaining pages
    //       </p>
    //       <p>
    //         <strong>
    //           <FaHourglassStart />
    //         </strong>{" "}
    //         September 1, 2023
    //       </p>
    //       <p>
    //         <strong>
    //           <FaHourglassEnd />
    //         </strong>{" "}
    //         September 30, 2023
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="challenge_container">
      <div className="challenge_content">
        <div className="challenge_head">
          <h5>Challenge name</h5>
          <div className="challenge_buttons">
            <button className="challenge_edit">
              <FaPencilAlt />
            </button>
            <button className="challenge_delete">
              <FaTrashAlt />
            </button>
          </div>
        </div>
        <div className="challenge_body">
          <div className="challenge_dates">
            <p>
              {" "}
              <FaHourglassStart style={{ marginRight: "0.5rem" }} />
              1-5-2023
            </p>
            <span>
              <FaLongArrowAltRight style={{ fontSize: "2rem" }} />
            </span>
            <p>
              1-6-2023
              <FaHourglassEnd style={{ marginLeft: "0.5rem" }} />
            </p>
          </div>
          <div className="challenge_completed_pages">
            {" "}
            <FaBookOpen style={{ marginRight: "0.5rem" }} />
            Completed: 7/5000
          </div>
          <div className="challenge_state">
            <p>in progress</p>
            <div className="challenge_progress_container">
              <div className="challenge_progress_bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BardLogin;
