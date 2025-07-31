// ProtectedLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utilites/authContextapi";

const ProtectedLayout = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
};

export { ProtectedLayout };
