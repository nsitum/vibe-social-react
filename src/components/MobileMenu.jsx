import styles from "./MobileMenu.module.css";
import { faNewspaper, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MobileMenu({ activeState, setActiveState }) {
  return (
    <nav>
      <ul className={styles.mobileMenu}>
        <li
          className={activeState === "account" ? styles.active : ""}
          onClick={() => setActiveState("account")}
        >
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
        </li>
        <li
          className={activeState === "posts" ? styles.active : ""}
          onClick={() => setActiveState("posts")}
        >
          <FontAwesomeIcon icon={faNewspaper} className={styles.icon} />
        </li>
      </ul>
    </nav>
  );
}

export default MobileMenu;
