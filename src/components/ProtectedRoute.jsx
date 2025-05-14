import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
