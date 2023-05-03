import { useState } from "react";
import { useDispatch } from "react-redux";
// import create message from message slice
import { sendMessage, getMessages } from "../../features/messages/messageSlice";

function MessageForm({ chat_id }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ content, chat_id }));
    dispatch(getMessages(chat_id));
    clearMessage();
  };

  const clearMessage = () => {
    setContent("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Write Message"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
        <button onClick={clearMessage}>clear</button>
      </form>
    </section>
  );
}

export default MessageForm;
