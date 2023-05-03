import { useEffect, useState, createContext } from "react";
import { useNavigate, Link } from "react-router-dom";
// to check if the user exists in the local storage
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getAllChats, reset } from "../features/chats/chatSlice";
import ChatItem from "../components/ChatItem.jsx";
import Messages from "./Messages";
import { getMessages, sendMessage } from "../features/messages/messageSlice";
import MessageForm from "../components/Message/MessageForm";

/// Context
import { MyContext } from "./MyContext";

function Inbox() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const usermessageStyle = {
    color: "green",
    float: "right",
  };
  const othermessageStyle = {
    color: "red",
    float: "left",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { chats, isLoading, isError, message } = useSelector(
    (state) => state.chats
  );

  const { messages } = useSelector((state) => state.messages);

  useEffect(() => {
    if (isError && chats.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getAllChats());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Chats List</p>
      </section>

      <section className="content">
        <div className="goals">
          {chats.length > 0 ? (
            <>
              {chats.map((chat) => (
                <>
                  <ChatItem key={chat.id} chat={chat} />
                  <button
                    className="btn btn-block"
                    onClick={(e) => {
                      dispatch(getMessages(chat.id));
                      setSelectedChatId(chat.id);
                      console.log("selectedChatId", chat.id);
                    }}
                  >
                    see messages
                  </button>
                </>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </section>

      {selectedChatId ? <>{navigate("/messages/" + selectedChatId)}</> : <></>}
    </>
  );
}

export default Inbox;
