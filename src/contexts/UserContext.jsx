import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(function () {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    async function getUser() {
      try {
        const userId = JSON.parse(localStorage.getItem("user"));
        const res = await fetch(BASE_URL + `/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
