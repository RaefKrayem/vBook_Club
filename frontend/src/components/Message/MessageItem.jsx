// import messageItem css file
import "../../styles/messageItem.css";

function MessageItem({ message, isUserMessage }) {
  return (
    <div className={isUserMessage ? "user-message" : "other-message"}>
      <div className="message-item">
        <div>{message.sender_username}</div>
        <div>{message.content}</div>
        <div>{message.sent_at}</div>
      </div>
    </div>
  );
}

export default MessageItem;
