import { createBrowserRouter } from "react-router";
import Root from '../pages/Root/Root';
import LoginPage from '../pages/LoginPage';
import GamePage from '../pages/GamePage';
import PrivateRoute from "../components/context/PrivateRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
// Import koro

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        element: <LoginPage />
      },
      {
        path: "/game",
        element: <PrivateRoute><GamePage /></PrivateRoute> // Ekhon eita private
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard /> // Admin-o private
      },
      {
        path: "/admin-login", 
        element: <AdminLogin />,
      },
    ]
  },
]);