import { useDispatch, useSelector } from "react-redux";
import { addFriend, getUsers } from "../features/users/userSlice";
import { getFriends, removeFriend } from "../features/friends/friendSlice";
import { getFriendMessages } from "../features/messages/messageSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import "../styles/User.css";

function UserItem({ user, isFriend }) {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const [chatClicked, setChatClicked] = useState(false);

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
    <div class="user_card">
      <div class="user_infos">
        <div class="user_image">
          <img src={user.profile} alt="user image" loading="lazy" />
        </div>
        <div class="user_info">
          <div>
            <p class="user_name">{user.username}</p>
            <p class="user_function"></p>
          </div>
          <div class="user_stats">
            <p class="user_flex user_flex-col">
              Challenges
              <span class="user_state-value">{user.challenges}</span>
            </p>
            <p class="user_flex">
              Friends
              <span class="user_state-value">{user.friends}</span>
            </p>
          </div>
        </div>
      </div>
      {isFriend ? (
        <div className="friend_request_container">
          <Link
            to={`/messages`}
            state={{ userInfo: user, chatProfile: user.profile }}
            key={user.id}
            className="text-decoration-none friend_request_link"
          >
            <button
              className="friend_request"
              type="button"
              onClick={handleChat}
            >
              <FontAwesomeIcon icon={faMessage} /> Chat
            </button>
          </Link>

          <button className="friend_request" onClick={handleRemoveFriend}>
            <FaUserMinus />
          </button>
        </div>
      ) : (
        <button class="user_request" type="button" onClick={handleAddFriend}>
          Add friend
        </button>
      )}
    </div>
  );
}

export default UserItem;
