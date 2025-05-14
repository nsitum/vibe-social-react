import styles from "./LoginForm.module.css";
import { Link } from "react-router";

function Login({
  username,
  setUsername,
  password,
  setPassword,
  onCurrentAction,
}) {
  function handleActionChange() {
    onCurrentAction("register");
  }

  return (
    <>
      <div className={styles.formInput}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
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
