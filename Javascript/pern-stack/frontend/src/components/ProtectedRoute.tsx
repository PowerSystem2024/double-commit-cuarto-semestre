import type { ReactNode } from "react";
import { useAuth } from "../contexts/userProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth();

  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
