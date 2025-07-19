
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole = null }) => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(storedUser);

    // If allowedRole is specified, check if it matches
    if (allowedRole && user.role !== allowedRole) {
      return <Navigate to="/permission-denied" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
