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
  //

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
      dispatch(getMessages(id));
      console.log(id);
    }
    if (userInfo) {
      dispatch(getFriendMessages({ friend_id: userInfo.id, chatName: "" }));
      console.log(userInfo);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

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
        <div
          className="messages_container"
          style={{
            backgroundColor: "#1d1e20",
            padding: "1rem 3rem ",
          }}
        >
          <div className="chat-body">
            <div className="chat-ul">
              <ul className="chat-list">
                {messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    isUserMessage={message.sender_id === user._id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </ul>
            </div>
            <div className="div-form">
              <MessageForm chat_id={id ? id : messages[0].chat_id_emp} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Messages;
