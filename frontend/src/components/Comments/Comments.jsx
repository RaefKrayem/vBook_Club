import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { getComments, reset } from "../../features/comments/commentSlice";
import CommentForm from "./CommentForm";
import { useNavigate } from "react-router-dom";
import "../../styles/Comments.css";
import Comment from "./Comment";

function Comments({ book_selfLink }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { comments, isLoading, isError, message } = useSelector(
    (state) => state.comments
  );

  useEffect(() => {
    if (!user) navigate("/login");

    dispatch(getComments(book_selfLink));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="comments-page">
      <div className="comments-list">
        <h2 className="comments-heading">Comments</h2>

        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments</p>
        )}
      </div>

      {user && (
        <div className="comment-form-container">
          <CommentForm book_selfLink={book_selfLink} />
        </div>
      )}
    </div>
  );
}

export default Comments;
