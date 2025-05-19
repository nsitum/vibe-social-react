import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Comment from "./Comment";

function Post({ post, comments }) {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const postComments = comments.filter(
    (comment) => comment.post_id === post.id
  );

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
      <div
        className={styles.postMenu}
        onClick={() => setShowPostMenu((showMenu) => !showMenu)}
      >
        <FontAwesomeIcon icon={faEllipsis} />
        {showPostMenu && (
          <ul className={styles.menu}>
            <li>Edit post</li>
            <li>Delete post</li>
          </ul>
        )}
      </div>

      {!!postComments.length && (
        <ul className={styles.comments}>
          {postComments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Post;
