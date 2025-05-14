import styles from "./Button.module.css";

function Button({ children, className = "" }) {
  return (
    <button className={`${className || styles.ctaButton}`}>{children}</button>
  );
}

export default Button;
