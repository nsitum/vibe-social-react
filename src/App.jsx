import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginForm from "./components/LoginForm";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import ModifyAccount from "./pages/ModifyAccount";
import { UserProvider } from "./contexts/UserContext";
import ProfilePicture from "./pages/ProfilePicture";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<LoginForm />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          >
            <Route
              path="/homepage/modify-acc"
              element={
                <ProtectedRoute>
                  <ModifyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homepage/profile-picture"
              element={
                <ProtectedRoute>
                  <ProfilePicture />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
