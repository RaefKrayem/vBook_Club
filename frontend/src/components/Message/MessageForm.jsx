import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../features/messages/messageSlice";
import { PaperPlaneRight, User } from "phosphor-react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

function MessageForm({ chat_id, socket }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendMessage({ content, chat_id }));
    await socket.emit("send_message", {
      id: user._id,
      sender_username: user.username,
      sender_id: user.id,
      chat_id: chat_id,
      content: content,
      sent_at:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      profile: user.profile,
    });
    clearMessage();
  };

  const handleMessageChange = (e) => {
    setContent(e.target.value);
  };

  const clearMessage = () => {
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className=" comment_input_group">
        <Form.Control
          placeholder="Send a message..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={content}
          onChange={handleMessageChange}
          // modify the bootstrap form control styles to fit theme
          className="comment_input"
        />
        <button
          variant="outline-secondary"
          id="button-addon2"
          type="submit"
          // override bootstrap button styles and modify to fit theme
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
          disabled={content === "" ? true : false}
        >
          <PaperPlaneRight size={25} />
        </button>
      </InputGroup>
    </form>
  );
}

export default MessageForm;
