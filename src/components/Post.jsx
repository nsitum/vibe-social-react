import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

function Post({ post }) {
  const date = new Date(post.created_at).toLocaleString().slice(0, -3);

  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img src={post.profilePicture} alt="" />
        <div className={styles.postUserAndDate}>
          <span className={styles.postUser}>{post.username}</span>
          <span className={styles.postDate}>{date}</span>
        </div>
      </div>
      <p className={styles.postContent}>{post.content}</p>
      <ul className={styles.postActions}>
        <li>
          <FontAwesomeIcon icon={faHeart} />
          <span className={styles.likeCount}>{post.likes}</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faComment} />
          <span className={styles.commentCount}>{post.comments.length}</span>
        </li>
      </ul>
    </div>
  );
}

export default Post;
