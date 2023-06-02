// import Messages css file
import "../../styles/Messages.css";
import { useSelector } from "react-redux";

function MessageItem({ message, isUserMessage }) {
  const { user } = useSelector((state) => state.auth);

  return (
    // if message content is empty return nothing
    // else return the message
    message.content ? (
      <li className={isUserMessage ? "out" : "in"}>
        <div className="chat-img">
          {/* if the message is a user message display the profile in the src */}
          {/* else display the default profile */}
          <img
            src={
              message.profile
                ? message.profile
                : isUserMessage
                ? user.profile
                : "https://www.bootdey.com/img/Content/avatar/avatar1.png"
            }
            alt="Avatar"
            className="rounded-circle"
          />
        </div>
        <div className="chat-body">
          <div className="chat-message">
            {!isUserMessage ? (
              <h5 style={{ color: "#1d1e20" }}>{message.sender_username}: </h5>
            ) : (
              ""
            )}
            {isUserMessage ? (
              <p>{message.content}</p>
            ) : (
              <p style={{ color: "#1d1e20" }}>{message.content}</p>
            )}
          </div>
        </div>
      </li>
    ) : (
      ""
    )
  );
}

export default MessageItem;
