import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Root/Root.jsx";
import Home from "./Root/Home.jsx";
import PublicHabit from "./PublicHabit/PublicHabit.jsx";
import Login from "./SignUp/Login.jsx";
import Register from "./SignUp/Register.jsx";
import AddHabit from "./AddHabit/AddHabit.jsx";
import MyHabit from "./MyHabit/MyHabit.jsx";
import AuthProvider from "./Authentication/AuthProvider.jsx";
import HabitDetails from "./PublicHabit/HabitDetails.jsx";
import PrivateRoute from "./Authentication/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/publicHabit",
        Component: PublicHabit,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/addHabit",
        element: (
          <PrivateRoute>
            <AddHabit></AddHabit>
          </PrivateRoute>
        ),
      },
      {
        path: "/myHabit",
        element: (
          <PrivateRoute>
            <MyHabit></MyHabit>
          </PrivateRoute>
        ),
      },
      {
        path: "/habits/:id",
        element: (
          <PrivateRoute>
            <HabitDetails></HabitDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://habit-tracker-blue-kappa.vercel.app/habits/${params.id}`,
          ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
