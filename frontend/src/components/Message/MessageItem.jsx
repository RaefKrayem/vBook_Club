function MessageItem({ message }) {
  return (
    <>
      <div>
        <div>{message.sender_username}</div>
        <div>{message.content}</div>
        <div>{message.sent_at}</div>
      </div>
      <br />
    </>
  );
}

export default MessageItem;
