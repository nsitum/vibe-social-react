import styles from "./Homepage.module.css";
import AccountInfo from "../components/AccountInfo";
import Posts from "../components/Posts";
import { Outlet } from "react-router";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <AccountInfo />
      <Posts />
      <Outlet />
    </div>
  );
}

export default Homepage;
