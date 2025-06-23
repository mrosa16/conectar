import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Users from "../pages/Users/Users";
import InactiveUsers from "../pages/Users/InactiveUsers";
import UserProfile from "../pages/Users/UserProfile";
import UserEditPage from "../pages/Users/UserEditPage/UserEditPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/inactiveusers" element={<InactiveUsers />} />,
      <Route path="/users/edit/:id" element={<UserEditPage />} />
    </Routes>
  );
}
