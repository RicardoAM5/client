import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

// PublicRoute: por defecto, si el usuario ya está logueado, lo redirige a '/'.
// Útil para pantallas como Login o Reset Password.
const PublicRoute = ({ redirectTo = "/" }) => {
  const { isLoggedIn } = useContext(AppContext);

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
