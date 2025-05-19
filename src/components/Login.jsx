import styles from "./LoginForm.module.css";
import { Link } from "react-router";

function Login({
  username,
  setUsername,
  password,
  setPassword,
  onCurrentAction,
  formErrors,
}) {
  function handleActionChange() {
    onCurrentAction("register");
  }

  const usernameError = formErrors.find((err) => err.field === "username");
  const passwordError = formErrors.find((err) => err.field === "password");

  return (
    <>
      <div className={styles.formInput}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className={styles.error}>
          {
            usernameError
              ? usernameError.message
              : "\u00A0" /* &nbsp; fallback */
          }
        </p>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.error}>
          {
            passwordError
              ? passwordError.message
              : "\u00A0" /* &nbsp; fallback */
          }
        </p>
        <p className={styles.register}>
          You don't have an account?{" "}
          <Link to={"/register"} onClick={handleActionChange}>
            Register
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
