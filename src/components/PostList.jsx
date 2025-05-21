import Post from "./Post";
import styles from "./PostList.module.css";

function PostList({ user, posts, comments, onEditPost, onDeletePost }) {
  if (!user?.postsLiked) return null;

  return (
    <div className={styles.postList}>
      {[...posts]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((post) => (
          <Post
            post={post}
            user={user}
            comments={comments}
            onEditPost={onEditPost}
            onDeletePost={onDeletePost}
            key={post.id}
          />
        ))}
    </div>
  );
}

export default PostList;
