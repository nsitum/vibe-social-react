import styles from "./Homepage.module.css";
import AccountInfo from "../components/AccountInfo";
import Posts from "../components/Posts";
import { Outlet } from "react-router";
import MobileMenu from "../components/MobileMenu";
import { useState } from "react";

function Homepage() {
  const [activeState, setActiveState] = useState("account");
  const [posts, setPosts] = useState([]);

  return (
    <>
      <div className={styles.homepage}>
        <MobileMenu activeState={activeState} setActiveState={setActiveState} />
        <AccountInfo activeState={activeState} />
        <Posts activeState={activeState} posts={posts} setPosts={setPosts} />
        <Outlet context={{ setPosts }} />
      </div>
    </>
  );
}

export default Homepage;
