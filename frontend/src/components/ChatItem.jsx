import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../features/messages/messageSlice";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function ChatItem({ chat }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="goal">
        {chat.isClubChat === 0 ? (
          chat.name.split(" ")[0] === user.username ? (
            <div>{chat.name.split(" ")[1]}</div>
          ) : (
            <div>{chat.name.split(" ")[0]}</div>
          )
        ) : (
          <div>{chat.name}</div>
        )}

        {/* <button
          onClick={(e) => {
            dispatch(getMessages(chat.id));
            navigate("/messages/" + chat.id);
            console.log("selectedChatId", chat.id);
          }}
        > 
          Access Chat
        </button> */}

        <Link
          to={`/messages`}
          state={{ id: chat.id }} // <-- state prop
          key={chat.id}
        >
          <Button
            variant="primary"
            onClick={() => dispatch(getMessages(chat.id))}
          >
            Access Chat
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ChatItem;
