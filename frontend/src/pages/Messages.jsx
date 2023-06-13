import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, reset } from "../features/messages/messageSlice";
import MessageItem from "../components/Message/MessageItem.jsx";
import MessageForm from "../components/Message/MessageForm.jsx";
import "../styles/Messages.css";

import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Messages() {
  console.log("socket: ", socket);

  const location = useLocation();
  console.log(location.state);

  // userInfo to access from friends and users page
  const [userInfo, setUserInfo] = useState(location.state.userInfo);

  // to access from chatItem
  const [id, setId] = useState(location.state.id);
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
    socket.emit("join_room", id);
  }, [id]);

  // handle receiving messages through socket
  useEffect(() => {
    console.log("the socket is: ", socket);
    socket.on("receive_message", (data) => {
      console.log("received message: ", data);
      dispatch(getMessages(id));
    });
  }, [socket]);
  // -----------------------------------------------

  useEffect(() => {
    if (isError && messages.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    if (id) {
      dispatch(getMessages(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError]);

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
                <MessageForm
                  chat_id={id ? id : messages[0].chat_id}
                  socket={socket}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Messages;
