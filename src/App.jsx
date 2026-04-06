import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Layout from "./pages/Layout";
import DashboardHome from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");

    if (stored) {
      const parsed = JSON.parse(stored);
      dispatch(login({ user: parsed.name, role: parsed.role }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <DashboardHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
