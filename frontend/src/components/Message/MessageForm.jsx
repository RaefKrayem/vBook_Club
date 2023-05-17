import { useState } from "react";
import { useDispatch } from "react-redux";
// import create message from message slice
import { sendMessage, getMessages } from "../../features/messages/messageSlice";
import { PaperPlaneRight } from "phosphor-react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function MessageForm({ chat_id }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ content, chat_id }));
    dispatch(getMessages(chat_id));
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
      <InputGroup className="mb-3 comment_input_group">
        <Form.Control
          placeholder="Add Comment"
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
