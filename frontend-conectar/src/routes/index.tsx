import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
