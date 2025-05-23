import styles from "./AccountInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";

function AccountInfo() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    setUser({});
    toast.success("Successfully logged out");
  }

  return (
    <div>
      <div className={styles.header}>
        <img src="/vibe.png" alt="Vibe logo" />
        <h1>Vibe</h1>
      </div>
      <div className={styles.profileInfo}>
        <img
          src={user.pictureUrl}
          alt="Profile picture"
          onClick={() => navigate("profile-picture")}
        />
        <p className={styles.username}>{user.username}</p>
      </div>
      <ul className={styles.profileActions}>
        <li>
          <Link to={"/homepage/modify-acc"} className={styles.link}>
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
