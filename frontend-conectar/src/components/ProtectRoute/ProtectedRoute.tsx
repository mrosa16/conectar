import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = !!localStorage.getItem("token"); // ou use um contexto

  return isAuthenticated ? children : <Navigate to="/" />;
}
