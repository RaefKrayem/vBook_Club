import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import {
  getComments,
  addComment,
  reset,
} from "../../features/comments/commentSlice";

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
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Add Comment"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={comment}
          onChange={handleCommentChange}
        />
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Add Comment
        </Button>
      </InputGroup>
    </form>
  );
}

export default CommentForm;
