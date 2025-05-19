import styles from "./AccountInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

function AccountInfo({ user }) {
  function handleLogout() {
    localStorage.removeItem("user");
  }

  return (
    <div>
      <div className={styles.header}>
        <img src="vibe.png" alt="Vibe logo" />
        <h1>Vibe</h1>
      </div>
      <div className={styles.profileInfo}>
        <img src={user.pictureUrl} alt="Profile picture" />
        <p className={styles.username}>{user.username}</p>
      </div>
      <ul className={styles.profileActions}>
        <li>
          <Link to={"/modify-acc"} className={styles.link}>
            <FontAwesomeIcon icon={faPen} className={styles.icon} />
            <span>Modify account</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/login"}
            replace
            className={styles.link}
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={styles.icon}
            />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AccountInfo;
