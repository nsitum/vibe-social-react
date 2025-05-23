import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginForm from "./components/LoginForm";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import ModifyAccount from "./pages/ModifyAccount";
import { UserProvider } from "./contexts/UserContext";
import ProfilePicture from "./pages/ProfilePicture";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e1e1e",
            color: "#f1f1f1",
            fontSize: "1.8rem",
            fontWeight: "500",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80", // light green
              secondary: "#1e1e1e",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#f87171", // light red
              secondary: "#1e1e1e",
            },
          },
        }}
      />

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
    </>
  );
}

export default App;
