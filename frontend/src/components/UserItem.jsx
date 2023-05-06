import { useDispatch, useSelector } from "react-redux";
import { addFriend, getUsers } from "../features/users/userSlice";
import { getFriends, removeFriend } from "../features/friends/friendSlice";
import { getFriendMessages } from "../features/messages/messageSlice";
import { useNavigate } from "react-router-dom";

function UserItem({ user, isFriend }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddFriend = () => {
    dispatch(addFriend(user.id));
    dispatch(getUsers());
    dispatch(getFriends());
  };

  const handleRemoveFriend = () => {
    dispatch(removeFriend(user.id));
    dispatch(getUsers());
    dispatch(getFriends());
  };

  const handleChat = () => {
    dispatch(
      getFriendMessages({ friend_id: user.id, chatName: user.username })
    );
  };

  return (
    <div className="goal">
      <h2>{user.username}</h2>
      <div>email {user.email}</div>
      <div>id {user.id}</div>

      {isFriend ? (
        <>
          <button className="close" onClick={handleRemoveFriend}>
            X
          </button>
          <button onClick={handleChat}>Chat</button>
        </>
      ) : (
        <button className="close" onClick={handleAddFriend}>
          Add
        </button>
      )}
    </div>
  );
}

export default UserItem;
