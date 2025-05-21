import styles from "./Posts.module.css";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";
const BASE_COMMENT_URL = "https://67de8fa8471aaaa74284e035.mockapi.io";

function Posts() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  function handleAddPost(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  function handleEditPost(editedPost) {
    setPosts((prev) =>
      prev.map((post) => (post.id === editedPost.id ? editedPost : post))
    );
  }

  function handleDeletePost(deletedPost) {
    setPosts((prev) => prev.filter((post) => post.id !== deletedPost.id));
  }

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

    async function getComments() {
      try {
        const res = await fetch(BASE_COMMENT_URL + "/comments");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    }

    getPosts();
    getComments();
  }, []);

  return (
    <div className={styles.posts}>
      <CreatePost user={user} onAddPost={handleAddPost} />
      <PostList
        user={user}
        posts={posts}
        comments={comments}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
}

export default Posts;
