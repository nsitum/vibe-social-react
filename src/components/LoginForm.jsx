import { useEffect, useState } from "react";
import Login from "./Login";
import styles from "./LoginForm.module.css";
import Button from "./Button";
import Register from "./Register";
import { useNavigate } from "react-router";
import { validateLogin, validateRegister } from "../utils/validateForm";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginForm() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentAction, setCurrentAction] = useState("login");
  const [formErrors, setFormErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(
    function () {
      if (user) navigate("/homepage");
    },
    [user, navigate]
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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user.id));

      setUser(data.user);
      return data.user;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin() {
    try {
      setFormErrors([]);
      setIsLoading(true);

      const formErrors = validateLogin({ username, password });
      if (formErrors.length) {
        setFormErrors(formErrors);
        return;
      }

      const res = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user.id));

      setUser(data.user);
      return data.user;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (currentAction === "login") {
      const user = await handleLogin();
      if (!user) return;
      navigate("/homepage");
      toast.success("Successfully logged in");
    }

    if (currentAction === "register") {
      try {
        const newUser = {
          email,
          username,
          password,
          confirmPassword,
          pictureUrl: "",
          postsLiked: [],
        };

        const user = await handleRegister(newUser);
        if (!user) return;
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
