import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { getComments, reset } from "../../features/comments/commentSlice";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useNavigate } from "react-router-dom";

function Comments({ book_selfLink }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { comments, isLoading, isError, message } = useSelector(
    (state) => state.comments
  );

  useEffect(() => {
    if (isError && comments.length > 0) {
      console.log(message);
    }

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
    <>
      <section className="heading">
        <p>Comments List</p>
      </section>

      <section className="content">
        <div className="goals">
          {comments && comments.length > 0 ? (
            <>
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </>
          ) : (
            <p>No comments</p>
          )}
        </div>
      </section>

      <section className="content">
        <CommentForm book_selfLink={book_selfLink} />
      </section>
    </>
  );
}

export default Comments;
