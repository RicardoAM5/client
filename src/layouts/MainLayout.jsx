import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";

/**
 * Layout principal de la aplicación
 * Contiene el Navbar y Menubar que se muestran en todas las páginas privadas
 */
const MainLayout = () => {
    return (
        <>
            {/* Barra de navegación superior */}
            <Menubar />
            
            {/* Menú lateral */}
            <Navbar />
            
            {/* Contenido principal - aquí se renderizan las rutas hijas */}
            <main style={{ marginLeft: "20px", marginTop: "56px", minHeight: "calc(100vh - 56px)" }}>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
