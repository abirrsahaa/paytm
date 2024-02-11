import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Signin from "./pages/Signin.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MoneyTransfer from "./pages/MoneyTransfer.jsx";

// successfully implemented the routing for the app
// need to build the home page for my app !

const router = createBrowserRouter([
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <Signin /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/transfer", element: <MoneyTransfer /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
