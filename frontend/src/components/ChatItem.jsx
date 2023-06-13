import { useDispatch } from "react-redux";
import { getMessages } from "../features/messages/messageSlice";
import { Link } from "react-router-dom";
import "../styles/Inbox.css";

function ChatItem({ chat }) {
  const dispatch = useDispatch();

  return (
    <>
      <Link
        to={`/messages`}
        state={{
          id: chat.id,
          chatName: chat.name,
          chatProfile: chat.profile,
        }}
        key={chat.id}
        onClick={() => {
          dispatch(getMessages(chat.id));
        }}
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
            <p></p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ChatItem;
