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
  formErrors,
  onChange,
  touchedFields,
}) {
  function handleActionChange() {
    onCurrentAction("login");
  }

  const usernameError = formErrors.find((err) => err.field === "username");
  const emailError = formErrors.find((err) => err.field === "email");
  const passwordError = formErrors.find((err) => err.field === "password");

  return (
    <>
      <div className={styles.formInput}>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              onChange("username", e.target.value);
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
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              onChange("email", e.target.value);
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
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              onChange("password", e.target.value);
            }}
          />
          <p className={styles.error}>
            {
              passwordError && touchedFields.password
                ? passwordError.message
                : "\u00A0" /* &nbsp; fallback */
            }
          </p>
        </div>
        <div>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              onChange("confirmPassword", e.target.value);
            }}
          />
          <p className={styles.error}>{"\u00A0"}</p>
        </div>
        <p className={styles.register}>
          Already registered?{" "}
          <Link to={"/login"} onClick={handleActionChange}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
