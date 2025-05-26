export function updateUserPosts({
  userId,
  newUsername,
  newProfilePicture,
  setPosts,
}) {
  if (!setPosts) return;

  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.user.id === userId
        ? {
            ...post,
            user: {
              ...post.user,
              ...(newUsername && { username: newUsername }),
              ...(newProfilePicture && { pictureUrl: newProfilePicture }),
            },
          }
        : post
    )
  );
}
