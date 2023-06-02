import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../features/messages/messageSlice";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import "../styles/Inbox.css";

function ChatItem({ chat }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Link
        to={`/messages`}
        state={{
          id: chat.id,
          chatName: chat.name,
          chatProfile: chat.profile,
        }} // <-- state prop
        key={chat.id}
        onClick={() => dispatch(getMessages(chat.id))}
        style={{
          textDecoration: "none",
        }}
      >
        <div className="i-chat">
          <div className="i-chat-avatar">
            <img
              src={chat.profile}
              alt="profile"
              className="i-chat-avatar"
              loading="lazy"
            />
          </div>
          <div className="i-chat-content">
            <h2>{chat.name}</h2>
            <p>Last message received...</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ChatItem;
