import { useNavigate } from "react-router";
import styles from "./ModifyAccount.module.css";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

function ModifyAccountModal() {
  const { user } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState();

  const navigate = useNavigate();
  const { div: MotionDiv } = motion;

  return (
    <div className={styles.backdrop} onClick={() => navigate("/homepage")}>
      <MotionDiv
        className={styles.modal}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="oldPassword">Old password:</label>
            <input
              id="oldPassword"
              type="password"
              autoComplete="off"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New password:</label>
            <input
              id="newPassword"
              type="password"
              autoComplete="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button>Izmijeni račun</Button>
        </form>
        <button
          className={styles.closeBtn}
          onClick={() => navigate("/homepage")}
        >
          <FontAwesomeIcon className={styles.closeBtnIcon} icon={faXmark} />
        </button>
      </MotionDiv>
    </div>
  );
}

export default ModifyAccountModal;
