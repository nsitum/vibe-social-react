import { useEffect, useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(
    function () {
      async function getPosts() {
        try {
          const res = await fetch(BASE_URL + "/posts");
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          console.error(err);
        }
      }
      getPosts();
    },
    [setPosts]
  );

  return (
    <div className={styles.postList}>
      {[...posts]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((post) => (
          <Post post={post} key={post.id} />
        ))}
    </div>
  );
}

export default PostList;
