import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

// PrivateRoute: renderiza las rutas hijas solo si el usuario está logueado.
// Si no, redirige a /login. Usa <Outlet /> para anidar rutas.
const PrivateRoute = ({ redirectTo = "/login" }) => {
  const { isLoggedIn } = useContext(AppContext);

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
