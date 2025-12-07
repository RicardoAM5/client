import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

/**
 * PrivateRoute: renderiza las rutas hijas solo si el usuario está logueado
 * Si no está logueado, redirige a /login
 * Incluye el MainLayout con Navbar y Menubar
 */
const PrivateRoute = ({ redirectTo = "/login" }) => {
    const { isLoggedIn } = useContext(AppContext);

    if (!isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    // Renderizar el layout con el contenido de las rutas hijas
    return <MainLayout />;
};

export default PrivateRoute;
