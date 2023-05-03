import { useDispatch } from "react-redux";
import { removeFriend } from "../features/friends/friendSlice";

function FriendItem({ friend }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <h2>{friend.username}</h2>
      <div>email {friend.email}</div>
      <div>id {friend.id}</div>

      <button
        className="close"
        onClick={() => dispatch(removeFriend(friend.id))}
      >
        X
      </button>

      <button>Chat</button>
    </div>
  );
}

export default FriendItem;
