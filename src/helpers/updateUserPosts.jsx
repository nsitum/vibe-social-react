// src/helpers/updateUserPosts.js

export async function updateUserPosts({
  userId,
  newUsername,
  newProfilePicture,
}) {
  try {
    const response = await fetch(
      "https://658c7c29859b3491d3f6257e.mockapi.io/posts"
    ); // prilagodi URL
    const allPosts = await response.json();

    // Filtriraj postove tog usera
    const userPosts = allPosts.filter((post) => post.user_id === userId);

    await Promise.all(
      userPosts.map((post) => {
        console.log(post.id);
        return fetch(
          `https://658c7c29859b3491d3f6257e.mockapi.io/posts/${post.id}`,
          {
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
          }
        );
      })
    );

    console.log("Userovi postovi su ažurirani.");
  } catch (err) {
    console.error("Greška pri ažuriranju postova:", err);
  }
}
