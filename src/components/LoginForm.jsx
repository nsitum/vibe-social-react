import { useEffect, useState } from "react";
import Login from "./Login";
import styles from "./LoginForm.module.css";
import Button from "./Button";
import Register from "./Register";
import { useNavigate } from "react-router";
import { validateLogin, validateRegister } from "../utils/validateForm";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function LoginForm() {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentAction, setCurrentAction] = useState("login");
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(
    function () {
      async function getUsers() {
        try {
          const res = await fetch(BASE_URL + "/users");
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          setUsers(data);
          return data;
        } catch (err) {
          console.error(err);
        }
      }

      function isLoggedIn() {
        const localUserId = localStorage.getItem("user");
        if (!localUserId) return false;
        return true;
      }
      if (isLoggedIn()) navigate("/homepage");

      getUsers();
    },
    [navigate]
  );

  async function handleRegister(user) {
    try {
      setFormErrors([]);
      setIsLoading(true);
      const formErrors = validateRegister({
        username,
        email,
        password,
        confirmPassword,
        users,
      });
      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      const res = await fetch(BASE_URL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      return data;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogin() {
    setFormErrors([]);
    setIsLoading(true);
    const formErrors = validateLogin({ username, password });
    if (formErrors.length) {
      setFormErrors(formErrors);
      return;
    }

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    setUser(foundUser);
    setIsLoading(false);
    return foundUser;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (currentAction === "login") {
      const user = handleLogin();
      if (!user) {
        toast.error("No user found");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user.id));
      navigate("/homepage");
      toast.success("Successfully logged in");
    }

    if (currentAction === "register") {
      try {
        const newUser = {
          email,
          username,
          password,
          postsLiked: [],
          pictureUrl: "https://i.ibb.co/PZc8hcgv/defaultimage.jpg",
        };

        const user = await handleRegister(newUser);
        if (!user) return;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user.id));
        navigate("/homepage");
        toast.success("Successfully registered");
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formText}>
          <h3 className={styles.formHeading}>Welcome to Vibe!</h3>
          <p className={styles.formInfo}>Feel free to join</p>
        </div>
        {currentAction === "login" ? (
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onCurrentAction={setCurrentAction}
            formErrors={formErrors}
          />
        ) : (
          <Register
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onCurrentAction={setCurrentAction}
            formErrors={formErrors}
          />
        )}
        <Button disabled={isLoading}>
          {currentAction[0].toUpperCase() + currentAction.slice(1)}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
