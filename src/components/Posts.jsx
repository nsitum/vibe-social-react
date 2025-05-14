import styles from "./Posts.module.css";
import CreatePost from "./CreatePost";
import PostList from "./PostList";

function Posts() {
  return (
    <div className={styles.posts}>
      <CreatePost />
      <PostList />
    </div>
  );
}

export default Posts;
