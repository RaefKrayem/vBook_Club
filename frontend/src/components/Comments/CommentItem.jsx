import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  deleteComment,
  reset,
} from "../../features/comments/commentSlice";

function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="content">
      <h4>{comment.username}</h4>

      <p>{comment.comment_text}</p>

      {user && user.username === comment.username && (
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => {
            dispatch(deleteComment(comment.id));
            dispatch(getComments(comment.book_selfLink));
          }}
        >
          Delete Comment
        </Button>
      )}
    </section>
  );
}

export default CommentItem;
