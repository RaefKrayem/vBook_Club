import { useDispatch, useSelector } from "react-redux";
import { Trash } from "phosphor-react";
import styles from "../../styles/Comments.module.css";
import Avatar from "../Avatar/Avatar";
import { deleteComment } from "../../features/comments/commentSlice";

function Comment({ comment }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleDeleteComment() {
    dispatch(deleteComment(comment.id));
  }

  return (
    <div className={styles.comment}>
      <Avatar src="https://github.com/gabivechiatto.png" hasBorder={false} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <h5>{comment.username}</h5>

              <time
                className={styles.date}
                title={comment.created_at}
                dateTime={comment.created_at}
              >
                {/* {comment.created_at} */}
                {/* {new Date(comment.created_at).toLocaleString()} */}
                {new Date(comment.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </time>
            </div>
            {user && user.username === comment.username && (
              <button onClick={handleDeleteComment} title="Delete Comment">
                <Trash size={24} />
              </button>
            )}
          </header>
          <p>{comment.comment_text}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
