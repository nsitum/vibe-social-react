import styles from "./Homepage.module.css";
import AccountInfo from "../components/AccountInfo";
import Posts from "../components/Posts";
import { Outlet } from "react-router";
import MobileMenu from "../components/MobileMenu";
import { useState } from "react";

function Homepage() {
  const [activeState, setActiveState] = useState("account");

  return (
    <>
      <div className={styles.homepage}>
        <MobileMenu activeState={activeState} setActiveState={setActiveState} />
        <AccountInfo activeState={activeState} />
        <Posts activeState={activeState} />
        <Outlet />
      </div>
    </>
  );
}

export default Homepage;
