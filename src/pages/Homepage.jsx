import styles from "./Homepage.module.css";
import AccountInfo from "../components/AccountInfo";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function Homepage() {
  const [user, setUser] = useState({});

  useEffect(function () {
    async function getUser() {
      try {
        const userId = JSON.parse(localStorage.getItem("user"));
        const res = await fetch(BASE_URL + `/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  return (
    <div className={styles.homepage}>
      <AccountInfo user={user} />
      <Posts user={user} />
    </div>
  );
}

export default Homepage;
