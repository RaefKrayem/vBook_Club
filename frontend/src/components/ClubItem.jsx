import { useDispatch } from "react-redux";
import { getAllClubs, joinClub } from "../features/clubs/clubSlice";
import { getMyClubs, leaveClub } from "../features/myClubs/myClubSlice";
import { useState } from "react";

function ClubItem({ club, isJoined }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{club.name}</div>

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
      <button>Club Chat</button>
    </div>
  );
}

export default ClubItem;
