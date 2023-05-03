function ChatItem({ chat }) {
  return (
    <>
      <div className="goal">
        <div>{chat.name}</div>
        <button>Access Chat</button>
      </div>
    </>
  );
}

export default ChatItem;
