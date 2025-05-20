import styles from "./CreatePost.module.css";
import Button from "./Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faHashtag,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function CreatePost({ user, onAddPost }) {
  const [content, setContent] = useState("");

  async function handleCreatePost(e) {
    e.preventDefault();
    try {
      if (!content) throw new Error("Post can't be blank!");

      const newPost = {
        user_id: user.id,
        content,
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
      const data = await res.json();
      onAddPost(data);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleCreatePost}>
      <div className={styles.postInput}>
        <img src={user.pictureUrl} alt="" />
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
        <Button className={styles.CreatePostBtn}>Create post</Button>
      </div>
    </form>
  );
}

export default CreatePost;
