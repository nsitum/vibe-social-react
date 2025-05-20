import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Comment from "./Comment";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function Post({ post, user, comments }) {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(user.postsLiked?.includes(post.id));
  const [isLiking, setIsLiking] = useState(false);
  const heartIcon = isLiked ? faHeartSolid : faHeart;

  const postComments = comments.filter(
    (comment) => comment.post_id === post.id
  );

  const date = new Date(post.created_at).toLocaleString().slice(0, -3);
  console.log(user.postsLiked);
  const likePayload = isLiked
    ? user.postsLiked.filter((id) => id !== post.id)
    : [...user.postsLiked, post.id];

  async function handlePostLike() {
    try {
      setLikes((likes) => (isLiked ? likes - 1 : likes + 1));
      setIsLiked((liked) => !liked);
      console.log(isLiked);
      await fetch(BASE_URL + `/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: isLiked ? likes - 1 : likes + 1 }),
      });

      await fetch(BASE_URL + `/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postsLiked: likePayload }),
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img src={post.profilePicture} alt="Profile picture" />
        <div className={styles.postUserAndDate}>
          <span className={styles.postUser}>{post.username}</span>
          <span className={styles.postDate}>{date}</span>
        </div>
      </div>
      <p className={styles.postContent}>{post.content}</p>
      <ul className={styles.postActions}>
        <li>
          <button
            className={styles.likeBtn}
            disabled={isLiking}
            onClick={async () => {
              setIsLiking(true);
              await handlePostLike();
              setIsLiking(false);
            }}
          >
            <FontAwesomeIcon icon={heartIcon} />
            <span className={styles.likeCount}>{likes}</span>
          </button>
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
