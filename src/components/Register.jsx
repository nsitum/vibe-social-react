import styles from "./LoginForm.module.css";
import { Link } from "react-router";

function Register({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onCurrentAction,
}) {
  function handleActionChange() {
    onCurrentAction("login");
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
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p className={styles.register}>
          You don't have an account?{" "}
          <Link to={"/login"} onClick={handleActionChange}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
