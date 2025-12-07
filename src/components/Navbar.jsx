import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import "./Navbar.css";

// Lista de opciones del menú
const menuItems = [
    {
        title: "Inicio",
        path: "/",
        permissions: [],
    },
    {
        title: "Producción y Órdenes",
        path: "/productos",
        submenu: [
            { title: "Órdenes Pendientes", path: "/productos/pendientes" },
            { title: "Producto en Proceso", path: "/productos/produccion" },
        ],
    },
    {
        title: "Inventarios",
        path: "/inventarios",
        submenu: [
            { title: "Localidades", path: "/inventarios/localidades" },
            { title: "Áreas", path: "/inventarios/areas" },
        ],
    },
    {
        title: "Simulaciones",
        path: "/simulaciones",
        submenu: [
            { title: "Simulación de compra", path: "/simulaciones/compra" },
            { title: "Simulación de producción", path: "/simulaciones/produccion" },
        ],
    },
    {
        title: "Reportes",
        path: "/reportes",
        submenu: [
            { title: "Compras", path: "/reportes/compras" },
            { title: "Producción", path: "/reportes/produccion" },
            { title: "Uso", path: "/reportes/inventory" },
            { title: "Ventas", path: "/reportes/ventas" },
        ],
    },
    {
        title: "Administración y Altas",
        path: "/administracion",
        submenu: [
            { title: "Maquinarias", path: "/administracion/maquinarias" },
            { title: "Procesos", path: "/administracion/procesos" },
            { title: "Localidades", path: "/administracion/localidades" },
            { title: "Áreas", path: "/administracion/areas" },
            { title: "Precios", path: "/administracion/precios" },
            { title: "Productos", path: "/administracion/productos" },
            { title: "Tipo", path: "/administracion/tipo" },
            { title: "Clase", path: "/administracion/clase" },
            { title: "Molino", path: "/administracion/molino" },
            { title: "Grado", path: "/administracion/grado" },
            { title: "Proveedor", path: "/administracion/proveedores" },
            { title: "Bobina", path: "/administracion/bobina" },
        ],
    },
    {
        title: "Configuración",
        path: "/configuracion",
        submenu: [{ title: "Usuarios", path: "/configuracion/usuarios" }],
    },
];

const Navbar = () => {
    // Hooks para navegación y obtener datos del usuario
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useContext(AppContext);

    // Estados del componente
    const [isOpen, setIsOpen] = useState(false); // Controla si el menú está abierto o cerrado
    const [expandedMenus, setExpandedMenus] = useState({}); // Guarda qué submenús están abiertos

    // Función para verificar si el usuario puede ver un item del menú
    const hasPermission = (requiredPermissions) => {
        // Si no requiere permisos, todos pueden verlo
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }
        // Si no hay usuario, no puede ver nada
        if (!userData || !userData.role) {
            return false;
        }
        // Verificar si el rol del usuario está en la lista de permisos
        return requiredPermissions.includes(userData.role);
    };

    // Filtrar el menú para mostrar solo lo que el usuario puede ver
    const filteredMenu = menuItems.filter((item) => hasPermission(item.permissions));

    // Función para abrir/cerrar un submenú
    const toggleSubmenu = (index) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [index]: !prev[index], // Cambia el estado del submenú (abierto/cerrado)
        }));
    };

    // Función para abrir/cerrar el menú principal
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Función para navegar a una página y cerrar el menú
    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    // Función que se ejecuta al hacer click en un item del menú
    const handleMenuItemClick = (item, index) => {
        if (item.submenu) {
            // Si tiene submenú, solo abrirlo/cerrarlo
            toggleSubmenu(index);
        } else {
            // Si no tiene submenú, navegar a la página
            handleNavigation(item.path);
        }
    };

    return (
        <>
            {/* Botón hamburguesa flotante (solo visible cuando el menú está cerrado) */}
            {!isOpen && (
                <button
                    className="position-fixed btn btn-link text-muted p-1"
                    style={{
                        top: "62px",
                        left: "8px",
                        zIndex: 1040,
                        textDecoration: "none",
                    }}
                    onClick={toggleMenu}
                >
                    <i className="bi bi-list fs-5"></i>
                </button>
            )}

            {/* Panel del menú lateral */}
            <div
                className="position-fixed bg-white shadow-lg"
                style={{
                    top: "56px",
                    left: isOpen ? "0" : "-240px", 
                    width: "240px",
                    height: "calc(100vh - 56px)",
                    transition: "left 0.35s ease",
                    overflowY: "auto",
                    borderRight: "1px solid #e0e0e0",
                    zIndex: 1040,
                }}
            >
                {/* Lista de opciones del menú */}
                <nav className="py-2">
                    {filteredMenu.map((item, index) => {
                        // Verificar si esta página está activa
                        const isActive = location.pathname.startsWith(item.path);
                        // Verificar si es el primer item (para mostrar el botón hamburguesa)
                        const isFirst = index === 0;

                        return (
                            <div key={index}>
                                {/* Contenedor del item principal */}
                                <div className="d-flex align-items-center">
                                    {/* Botón hamburguesa solo en el primer item */}
                                    {isFirst && (
                                        <button
                                            className="btn btn-link text-muted p-1"
                                            style={{ textDecoration: "none", minWidth: "32px" }}
                                            onClick={toggleMenu}
                                        >
                                            <i className="bi bi-list fs-6"></i>
                                        </button>
                                    )}

                                    {/* Botón del item del menú */}
                                    <button
                                        className={`menu-item btn w-100 text-start py-2 ${
                                            isActive ? "active" : ""
                                        }`}
                                        style={{ paddingLeft: isFirst ? "0.5rem" : "1rem" }}
                                        onClick={() => handleMenuItemClick(item, index)}
                                    >
                                        {item.title}
                                        {/* Flecha para indicar que tiene submenú */}
                                        {item.submenu && (
                                            <i
                                                className={`bi bi-chevron-${
                                                    expandedMenus[index] ? "up" : "down"
                                                } float-end`}
                                                style={{ fontSize: "0.75rem" }}
                                            />
                                        )}
                                    </button>
                                </div>

                                {/* Submenú (solo se muestra si existe y está expandido) */}
                                {item.submenu && expandedMenus[index] && (
                                    <div className="submenu-container">
                                        {item.submenu.map((subitem, subindex) => (
                                            <button
                                                key={subindex}
                                                className="submenu-item btn w-100 text-start px-4 py-2"
                                                onClick={() => handleNavigation(subitem.path)}
                                            >
                                                {subitem.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default Navbar;
