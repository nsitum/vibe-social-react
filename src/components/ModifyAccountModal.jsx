import { useNavigate } from "react-router";
import styles from "./ModifyAccountModal.module.css";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { validateModifyUser } from "../utils/validateForm";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function ModifyAccountModal() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [isModifying, setIsModifying] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const { div: MotionDiv } = motion;

  const usernameError = formErrors.find((err) => err.field === "username");
  const emailError = formErrors.find((err) => err.field === "email");
  const oldPasswordError = formErrors.find(
    (err) => err.field === "oldPassword"
  );
  const newPasswordError = formErrors.find(
    (err) => err.field === "newPassword"
  );

  useEffect(() => {
    if (!user) return;

    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch(BASE_URL + "/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    }

    getAllUsers();
  }, []);

  async function handleModifyUser(e) {
    e.preventDefault();
    try {
      setFormErrors([]);
      setIsModifying(true);
      const formErrors = validateModifyUser({
        username,
        email,
        oldPassword,
        newPassword,
        existingUsers: users,
        currentUserId: user.id,
        currentPassword: user.password,
      });
      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      const res = await fetch(BASE_URL + `/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          ...(newPassword?.trim() && { password: newPassword }),
        }),
      });
      const data = await res.json();
      setUser(data);
      navigate("/homepage");
      setNewPassword("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsModifying(false);
    }
  }

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
        <form onSubmit={handleModifyUser}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className={styles.error}>
              {
                usernameError
                  ? usernameError.message
                  : "\u00A0" /* &nbsp; fallback */
              }
            </p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={styles.error}>
              {emailError ? emailError.message : "\u00A0" /* &nbsp; fallback */}
            </p>
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
            <p className={styles.error}>
              {
                oldPasswordError
                  ? oldPasswordError.message
                  : "\u00A0" /* &nbsp; fallback */
              }
            </p>
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
            <p className={styles.error}>
              {
                newPasswordError
                  ? newPasswordError.message
                  : "\u00A0" /* &nbsp; fallback */
              }
            </p>
          </div>
          <Button isDisabled={isModifying}>Izmijeni račun</Button>
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
