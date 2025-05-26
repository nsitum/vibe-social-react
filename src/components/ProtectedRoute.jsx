import { Navigate } from "react-router";
import { useUser } from "../hooks/useUser";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
