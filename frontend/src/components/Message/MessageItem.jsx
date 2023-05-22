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
            // src={
            //   message.profile
            //     ? message.profile
            //     : "https://www.bootdey.com/img/Content/avatar/avatar1.png"
            // }
            src={user.profile}
            alt="Avatar"
            className="rounded-circle"
          />
        </div>
        <div className="chat-body">
          <div className="chat-message">
            {!isUserMessage ? <h5>{message.sender_username}: </h5> : ""}
            <p>{message.content}</p>
          </div>
        </div>
      </li>
    ) : (
      ""
    )
  );
}

export default MessageItem;
