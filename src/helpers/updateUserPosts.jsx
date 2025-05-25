// src/helpers/updateUserPosts.js

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function updateUserPosts({
  userId,
  newUsername,
  newProfilePicture,
}) {
  try {
    const response = await fetch(BASE_URL);
    const allPosts = await response.json();

    // Filtriraj postove tog usera
    const userPosts = allPosts.filter((post) => post.user_id === userId);

    await Promise.all(
      userPosts.map((post) => {
        console.log(post.id);
        return fetch(BASE_URL + `/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...post,
            ...(newUsername !== undefined && { username: newUsername }),
            ...(newProfilePicture !== undefined && {
              profilePicture: newProfilePicture,
            }),
          }),
        });
      })
    );

    console.log("Userovi postovi su ažurirani.");
  } catch (err) {
    console.error("Greška pri ažuriranju postova:", err);
  }
}
