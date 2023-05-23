import { useDispatch, useSelector } from "react-redux";
import { getAllClubs, joinClub, deleteClub } from "../features/clubs/clubSlice";
import { getMyClubs, leaveClub } from "../features/myClubs/myClubSlice";
import { getMessages } from "../features/messages/messageSlice";
import { Link } from "react-router-dom";
// import all images from assets folder

import "../styles/testClub.css";

function ClubItem({ club, isJoined }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    // set a border of border: "1px solid #eef1f4"

    <div className="club_card_container">
      <div className="club_card_image">
        <img src={club.profile} alt="" loading="lazy" />
      </div>

      <div className="club_card_content">
        <div className="club_card_text">
          <div className="club_card_title">
            <h2>{club.name}</h2>
          </div>
          {club.description}
        </div>

        <div className="club_card_btns">
          {user.isAdmin === 0 ? (
            <>
              {isJoined ? (
                <>
                  <Link
                    to={`/messages`}
                    state={{ id: club.id, chatName: club.name }} // <-- state prop
                    key={club.id}
                  >
                    <button
                      className="button"
                      onClick={() => dispatch(getMessages(club.id))}
                    >
                      Chat
                    </button>
                  </Link>
                  <button
                    className="button"
                    onClick={() => {
                      dispatch(leaveClub(club.id));
                      dispatch(getAllClubs());
                      dispatch(getMyClubs());
                    }}
                  >
                    Leave
                  </button>
                </>
              ) : (
                <button
                  // variant="primary"
                  onClick={() => {
                    dispatch(joinClub(club.id));
                    dispatch(getAllClubs());
                    dispatch(getMyClubs());
                  }}
                  className="button"
                >
                  Join
                </button>
              )}
            </>
          ) : (
            <>
              <button
                // variant="primary"
                onClick={() => {
                  dispatch(deleteClub(club.id));
                  dispatch(getAllClubs());
                }}
                className="button"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClubItem;
