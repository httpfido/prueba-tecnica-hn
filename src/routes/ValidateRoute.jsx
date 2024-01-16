import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function ValidateRoute() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
}
