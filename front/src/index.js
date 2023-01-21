import React from "react";
import { createRoot } from "react-dom/client";
import './index.css';

import Root from "./pages/Root";
import Studios from "./pages/Studios";
import Subscriptions from "./pages/Subscriptions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Studio from "./pages/Studio";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserClasses from "./pages/UserClasses";
import UserPayments from "./pages/UserPayments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "studios/",
    element: <Studios />,
  },
  {
    path: "studio/:studio_id/:lat/:lon/",
    element: <Studio />,
  },
  {
    path: "subscriptions/",
    element: <Subscriptions />,
  },
  {
    path: "myPayments/",
    element: <UserPayments />,
  },
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "register/",
    element: <Register />,
  },
  {
    path: "edit/",
    element: <Edit />,
  },
  {
    path: "myClasses/",
    element: <UserClasses />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);