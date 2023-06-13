import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// to check if the user exists in the local storage
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllChats, reset } from "../features/chats/chatSlice";
import ChatItem from "../components/ChatItem.jsx";
import "../styles/Inbox.css";

function Inbox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { chats, isLoading, isError, message } = useSelector(
    (state) => state.chats
  );

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
      <div className="inbox_body">
        <div className="inbox">
          <h1 className="inbox_h1">My Inbox</h1>
          <div className="i-chat-container">
            {chats.length > 0 ? (
              <>
                {chats.map((chat) => (
                  <ChatItem key={chat.id} chat={chat} />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;
