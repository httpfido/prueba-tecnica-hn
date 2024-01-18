import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ValidateRoute from "./routes/ValidateRoute.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/dashboard",
    element: <ValidateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
