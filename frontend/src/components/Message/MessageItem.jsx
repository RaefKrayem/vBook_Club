// import messageItem css file
import "../../styles/messageItem.css";

function MessageItem({ message, isUserMessage }) {
  return (
    <div className={isUserMessage ? "user-message" : "other-message"}>
      <div className="message-item">
        <div></div>
        <div>
          {/* if the sender username was equal to the user username do not display the name */}
          {!isUserMessage && (
            <span className="message-username" style={{ color: "#8e2b32" }}>
              {message.sender_username}:{" "}
            </span>
          )}
          {message.content}
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
