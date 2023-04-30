import { useDispatch } from "react-redux";
import { getAllClubs, joinClub } from "../features/clubs/clubSlice";
import { getMyClubs, leaveClub } from "../features/myClubs/myClubSlice";

function ClubItem({ club, isJoined }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div>id {club.id}</div>

      {isJoined ? ( // if isJoined is true, show the following
        <button
          className="close"
          onClick={() => {
            dispatch(leaveClub(club.id));
            dispatch(getAllClubs());
            dispatch(getMyClubs());
          }}
        >
          X
        </button>
      ) : (
        // if isJoined is false, show the following
        <button
          className="close"
          onClick={() => {
            dispatch(joinClub(club.id));
            dispatch(getAllClubs());
            dispatch(getMyClubs());
          }}
        >
          Join
        </button>
      )}
    </div>
  );
}

export default ClubItem;
