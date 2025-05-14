import styles from "./Homepage.module.css";
import AccountInfo from "../components/AccountInfo";
import Posts from "../components/Posts";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <AccountInfo />
      <Posts />
    </div>
  );
}

export default Homepage;
