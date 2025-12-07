import axios from "axios";

/**
 * Configuración base de Axios
 * Aquí defines la URL base de tu API y configuraciones globales
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Crear instancia de axios con configuración base
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 segundos timeout
});

/**
 * Interceptor para agregar token de autenticación a cada petición
 * Se ejecuta antes de enviar cada request
 */
apiClient.interceptors.request.use(
    (config) => {
        // Obtener token del localStorage
        const token = localStorage.getItem("token");
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor para manejar respuestas y errores globalmente
 * Se ejecuta después de recibir cada response
 */
apiClient.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa, retornarla
        return response;
    },
    (error) => {
        // Manejar errores globalmente
        if (error.response) {
            // El servidor respondió con un código de error
            switch (error.response.status) {
                case 401:
                    // No autorizado - redirigir a login
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    break;
                case 403:
                    // Prohibido - sin permisos
                    console.error("No tienes permisos para realizar esta acción");
                    break;
                case 404:
                    // No encontrado
                    console.error("Recurso no encontrado");
                    break;
                case 500:
                    // Error del servidor
                    console.error("Error interno del servidor");
                    break;
                default:
                    console.error("Error:", error.response.data.message || "Error desconocido");
            }
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta
            console.error("No se pudo conectar con el servidor");
        } else {
            // Algo pasó al configurar la petición
            console.error("Error:", error.message);
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
