import styles from "./Posts.module.css";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Posts({ activeState, posts, setPosts }) {
  const { user } = useUser();

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

  useEffect(
    function () {
      async function getPosts() {
        try {
          const res = await fetch(BASE_URL + "/posts", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          toast.error(err.message);
        }
      }

      getPosts();
    },
    [setPosts]
  );

  if (!posts || !Array.isArray(posts)) return null;

  return (
    <div
      className={`${styles.posts} ${
        activeState === "all" || activeState === "posts" ? "" : "hidden"
      }`}
    >
      <CreatePost user={user} onAddPost={handleAddPost} />
      <PostList
        user={user}
        posts={posts}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
}

export default Posts;
