import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart as faHeartSolid,
  faComment as faCommentSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { motion } from "framer-motion";
import Button from "./Button";
import toast from "react-hot-toast";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";
const BASE_COMMENT_URL = "https://67de8fa8471aaaa74284e035.mockapi.io";

function Post({ post, user, comments, setComments, onEditPost, onDeletePost }) {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(user.postsLiked?.includes(post.id));
  const [isLiking, setIsLiking] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const menuRef = useRef();

  useEffect(function () {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowPostMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const heartIcon = isLiked ? faHeartSolid : faHeart;
  const commentIcon = isCommenting ? faCommentSolid : faComment;

  const { div: MotionDiv } = motion;

  const postComments = comments.filter(
    (comment) => comment.post_id === post.id
  );

  const date = new Date(post.created_at).toLocaleString().slice(0, -3);
  const likePayload = isLiked
    ? user.postsLiked.filter((id) => id !== post.id)
    : [...user.postsLiked, post.id];

  async function handlePostLike() {
    try {
      setLikes((likes) => (isLiked ? likes - 1 : likes + 1));
      setIsLiked((liked) => !liked);
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
      toast.error(err.message);
    }
  }

  async function handleCommentPost(e) {
    e.preventDefault();
    try {
      setIsSubmittingComment(true);
      if (!comment.length) throw new Error("Comment can't be empty");
      if (comment.length > 200) throw new Error("Comment too long!");
      const newComment = {
        post_id: post.id,
        content: comment.trim(),
        user_id: user.id,
        authorUser: user.username,
        likes: 0,
        pictureUrl: user.pictureUrl,
        created_at: new Date(),
      };

      const res = await fetch(BASE_COMMENT_URL + "/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setComments((prev) => [...prev, data]);
      setComment("");
      toast.success("Successfully commented");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsCommenting(false);
      setIsSubmittingComment(false);
    }
  }

  async function handleEditPost(e) {
    e.preventDefault();
    try {
      if (!editContent) throw new Error("Post can't be empty!");
      const res = await fetch(BASE_URL + `/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editContent }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setIsEditing(false);
      onEditPost(data);
      toast.success("Successfully edited post");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDeletePost() {
    try {
      const confirmation = confirm("Are you sure you want to delete the post?");
      if (!confirmation) return;

      const res = await fetch(BASE_URL + `/posts/${post.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();

      onDeletePost(data);
      toast.success("Successfully deleted post");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.post}
    >
      <div className={styles.postInfo}>
        <img src={post.profilePicture} alt="Profile picture" />
        <div className={styles.postUserAndDate}>
          <span className={styles.postUser}>{post.username}</span>
          <span className={styles.postDate}>{date}</span>
        </div>
      </div>
      {isEditing ? (
        <form onSubmit={handleEditPost}>
          <input
            type="text"
            className={styles.editInput}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <Button className={styles.postBtn}>Edit</Button>
        </form>
      ) : (
        <p className={styles.postContent}>{post.content}</p>
      )}
      <ul className={styles.postActions}>
        <li>
          <motion.button
            whileTap={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={styles.actionBtn}
            disabled={isLiking}
            onClick={async () => {
              setIsLiking(true);
              await handlePostLike();
              setIsLiking(false);
            }}
          >
            <FontAwesomeIcon icon={heartIcon} />
            <span className={styles.likeCount}>{likes}</span>
          </motion.button>
        </li>
        <li>
          <button
            className={styles.actionBtn}
            onClick={() => setIsCommenting((prev) => !prev)}
          >
            <FontAwesomeIcon icon={commentIcon} />
            <span className={styles.commentCount}>{postComments?.length}</span>
          </button>
        </li>
      </ul>
      {user.id === post.user_id && (
        <div
          className={styles.postMenu}
          onClick={() => setShowPostMenu((showMenu) => !showMenu)}
          ref={menuRef}
        >
          <FontAwesomeIcon icon={faEllipsis} />
          {showPostMenu && (
            <ul className={styles.menu}>
              <li onClick={() => setIsEditing(true)}>Edit post</li>
              <li onClick={handleDeletePost}>Delete post</li>
            </ul>
          )}
        </div>
      )}

      {isCommenting && (
        <form onSubmit={handleCommentPost}>
          <input
            type="text"
            className={styles.editInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button className={styles.postBtn} isDisabled={isSubmittingComment}>
            Comment
          </Button>
        </form>
      )}

      {!!postComments.length && (
        <ul className={styles.comments}>
          {[...postComments]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
        </ul>
      )}
    </MotionDiv>
  );
}

export default Post;
