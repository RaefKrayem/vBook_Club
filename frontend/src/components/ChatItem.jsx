import { useSelector } from "react-redux";

function ChatItem({ chat }) {
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

        <button>Access Chat</button>
      </div>
    </>
  );
}

export default ChatItem;
