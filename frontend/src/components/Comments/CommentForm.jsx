import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { PaperPlaneRight } from "phosphor-react";
import {
  getComments,
  addComment,
  reset,
} from "../../features/comments/commentSlice";
import "../../styles/CommentForm.css";

function CommentForm({ book_selfLink }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      book_selfLink: book_selfLink,
      comment_text: comment,
    };

    dispatch(addComment(commentData));
    dispatch(getComments(book_selfLink));
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="mb-3 comment_input_group">
        <Form.Control
          placeholder="Add Comment"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={comment}
          onChange={handleCommentChange}
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
          disabled={comment === "" ? true : false}
        >
          <PaperPlaneRight size={25} />
        </button>
      </InputGroup>
    </form>
  );
}

export default CommentForm;
