import styles from "./Comment.module.css";

function Comment({ comment }) {
  return (
    <li className={styles.comment}>
      <img src={comment.pictureUrl} alt="Profile picture" />
      <div className={styles.commentContent}>
        <p className={styles.commentAuthor}>{comment.authorUser}</p>
        <p>{comment.content}</p>
      </div>
    </li>
  );
}

export default Comment;
