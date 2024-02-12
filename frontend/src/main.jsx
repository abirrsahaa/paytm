import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Signin from "./pages/Signin.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MoneyTransfer from "./pages/MoneyTransfer.jsx";
import store from "./store/store.js";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
