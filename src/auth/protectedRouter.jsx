// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const protectedRouter = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
   
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default protectedRouter;
