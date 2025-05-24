import styles from "./CreatePost.module.css";
import Button from "./Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faHashtag,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function CreatePost({ onAddPost }) {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreatePost(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (!content) throw new Error("Post can't be blank!");

      const newPost = {
        user_id: user.id,
        content: content.trim(),
        likes: 0,
        username: user.username,
        created_at: new Date(),
        edited_at: "",
        isEdited: false,
        comments: [],
        profilePicture: user.pictureUrl,
      };

      const res = await fetch(BASE_URL + "/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      onAddPost(data);
      setContent("");
      toast.success("Post created");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleCreatePost}>
      <div className={styles.postInput}>
        <img src={user.pictureUrl} alt="Profile picture" />
        <input
          type="text"
          placeholder="Write post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className={styles.postActions}>
        <ul>
          <li>
            <FontAwesomeIcon icon={faPhotoFilm} className={styles.icon} />
            <span>Media content</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
            <span>Hashtags</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faClipboardList} className={styles.icon} />
            <span>Schedule</span>
          </li>
        </ul>
        <Button className={styles.CreatePostBtn} isDisabled={isSubmitting}>
          Create post
        </Button>
      </div>
    </form>
  );
}

export default CreatePost;
