import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Account from "@/pages/Account";
import Bookings from "@/pages/Bookings";
import Cabins from "@/pages/Cabins";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";
import NewUsers from "@/pages/Users";
import PageNotFound from "@/pages/PageNotFound";
import AppLayout from "@/ui/AppLayout";

const router = createBrowserRouter([
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Navigate replace to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "cabins",
        element: <Cabins />,
      },

      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "users",
        element: <NewUsers />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
