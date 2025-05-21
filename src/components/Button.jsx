import styles from "./Button.module.css";

function Button({ children, className = "", isDisabled }) {
  return (
    <button
      className={`${className || styles.ctaButton}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
