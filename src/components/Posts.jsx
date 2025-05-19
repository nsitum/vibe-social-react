import styles from "./Posts.module.css";
import CreatePost from "./CreatePost";
import PostList from "./PostList";

function Posts({ user }) {
  return (
    <div className={styles.posts}>
      <CreatePost user={user} />
      <PostList />
    </div>
  );
}

export default Posts;
