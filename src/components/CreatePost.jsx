import styles from "./CreatePost.module.css";
import Button from "./Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faHashtag,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
  return (
    <form className={styles.form}>
      <div className={styles.postInput}>
        <img src="profile-photo.jpg" alt="" />
        <input type="text" placeholder="Write post..." />
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
