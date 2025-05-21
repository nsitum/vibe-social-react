import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("There is no context!");
  return context;
}
