import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  getFriendMessages,
  getMessages,
  reset,
} from "../features/messages/messageSlice";
import MessageItem from "../components/Message/MessageItem.jsx";
import MessageForm from "../components/Message/MessageForm.jsx";
import "../styles/Messages.css";

function Messages() {
  const location = useLocation();
  // const id  = useParams();

  // new added code
  const [userInfo, setUserInfo] = useState(location.state.userInfo);
  const [id, setId] = useState(location.state.id);
  console.log("location.state: ", location.state);
  const [chatName, setChatName] = useState(location.state.chatName);
  const [chatProfile, setChatProfile] = useState(location.state.chatProfile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { messages, isLoading, isError, message } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    if (isError && messages.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    if (id) {
      console.log("chatName", chatName);
      dispatch(getMessages(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [messages]);

  return (
    <>
      <section className="messages_body">
        <div className="chatName">
          <img src={chatProfile} alt="" className="i-chat-avatar" />
          <h3>{chatName ? chatName : userInfo.username}</h3>
        </div>
        <div
          className="messages_container"
          style={{
            backgroundColor: "#1d1e20",
            padding: "1rem 3rem ",
            border: "2px solid #505258",
            borderRadius: "14px",
          }}
        >
          <div className="chat-body">
            <div className="chat-ul">
              <ul className="chat-list">
                {messages &&
                  messages.map((message) => (
                    <MessageItem
                      key={message.id || message.chat_id_emp}
                      message={message}
                      isUserMessage={message.sender_id === user._id}
                    />
                  ))}
                <div ref={messagesEndRef} />
              </ul>
            </div>
            <div className="div-form">
              {messages.length > 0 && (
                <MessageForm chat_id={id ? id : messages[0].chat_id} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Messages;
