import { useNavigate } from "react-router";
import styles from "./ModifyAccountModal.module.css";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { validateModifyUser } from "../utils/validateForm";
import { updateUserPosts } from "../helpers/updateUserPosts.js";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ModifyAccountModal() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [isModifying, setIsModifying] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();
  const { setPosts } = useOutletContext();

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

  function handleChange(fieldName, value) {
    if (!touchedFields[fieldName]) {
      setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    }

    const updated = {
      username,
      email,
      oldPassword,
      newPassword,
      [fieldName]: value,
    };

    const errors = validateModifyUser(updated);

    setFormErrors(errors);
  }

  // async function validatePassword() {
  //   try {
  //     const res = await fetch();
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // }

  async function handleModifyUser(e) {
    e.preventDefault();
    try {
      setIsModifying(true);

      // const errors = validateModifyUser({
      //   oldPassword,
      //   existingUsers: users,
      //   currentUserId: user.id,
      // });

      // setFormErrors(errors);

      if (formErrors.length) return;

      const res = await fetch(BASE_URL + "/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username,
          email,
          oldPassword,
          ...(newPassword?.trim() && { password: newPassword }),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");

      // Ažuriraj i postove
      updateUserPosts({
        userId: user.id,
        newUsername: username,
        setPosts,
      });
      setUser(data);
      navigate("/homepage");
      setNewPassword("");
      toast.success("Successfully modified user");
    } catch (err) {
      toast.error(err.message);
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
              onChange={(e) => {
                setUsername(e.target.value);
                handleChange("username", e.target.value);
              }}
            />
            <p className={styles.error}>
              {
                usernameError && touchedFields.username
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
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange("email", e.target.value);
              }}
            />
            <p className={styles.error}>
              {
                emailError && touchedFields.email
                  ? emailError.message
                  : "\u00A0" /* &nbsp; fallback */
              }
            </p>
          </div>
          <div>
            <label htmlFor="oldPassword">Old password:</label>
            <input
              id="oldPassword"
              type="password"
              autoComplete="off"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                handleChange("oldPassword", e.target.value);
              }}
            />
            <p className={styles.error}>
              {
                oldPasswordError && touchedFields.oldPassword
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
              onChange={(e) => {
                setNewPassword(e.target.value);
                handleChange("newPassword", e.target.value);
              }}
            />
            <p className={styles.error}>
              {
                newPasswordError && touchedFields.newPassword
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
