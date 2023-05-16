// import Messages css file
import "../../styles/Messages.css";

function MessageItem({ message, isUserMessage }) {
  return (
    <li className={isUserMessage ? "out" : "in"}>
      <div className="chat-img">
        <img
          src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
          alt="Avatar"
        />
      </div>
      <div className="chat-body">
        <div className="chat-message">
          {/* if the sender username was equal to the user username do not display the name */}

          {!isUserMessage ? <h5>{message.sender_username}: </h5> : ""}
          <p>{message.content}</p>
        </div>
      </div>
    </li>
  );
}

export default MessageItem;
