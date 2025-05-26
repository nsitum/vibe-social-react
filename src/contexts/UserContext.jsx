import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const BASE_URL = import.meta.env.VITE_BASE_URL;

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchUserFromToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(BASE_URL + "/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("Bad token:", data?.error);
          localStorage.removeItem("token");
        }
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserFromToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
