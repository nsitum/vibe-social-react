import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PostList.module.css";
// import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

function PostList() {
  return (
    <div className={styles.postList}>
      <div className={styles.post}>
        <div className={styles.postInfo}>
          <img src="profile-photo.jpg" alt="" />
          <div className={styles.postUserAndDate}>
            <span className={styles.postUser}>nsitum</span>
            <span className={styles.postDate}>11. 05. 2025. u 20:13</span>
          </div>
        </div>
        <p className={styles.postContent}>Pozdrav svima, ovo je novi post</p>
        <ul className={styles.postActions}>
          <li>
            <FontAwesomeIcon icon={faHeart} />
            <span className={styles.likeCount}>1</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faComment} />
            <span className={styles.commentCount}>1</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PostList;
