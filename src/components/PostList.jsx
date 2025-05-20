import { useEffect, useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";
const BASE_COMMENT_URL = "https://67de8fa8471aaaa74284e035.mockapi.io";

function PostList({ user }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(function () {
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
  }, []);

  useEffect(function () {
    async function getComments() {
      try {
        const res = await fetch(BASE_COMMENT_URL + "/comments");
        const data = await res.json();
        console.log(data);
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    }
    getComments();
  }, []);

  if (!user?.postsLiked) return null;

  return (
    <div className={styles.postList}>
      {[...posts]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((post) => (
          <Post post={post} user={user} comments={comments} key={post.id} />
        ))}
    </div>
  );
}

export default PostList;
