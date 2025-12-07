import apiClient from "./api";

/**
 * Servicio para gestionar operaciones CRUD de Tipos
 * Centraliza todas las llamadas a la API relacionadas con Tipos
 */
const TipoService = {
    /**
     * Obtener todos los tipos (sin paginación)
     * GET /tipos
     */
    getAll: async () => {
        const response = await apiClient.get("/tipos");
        return response.data;
    },

    /**
     * Obtener tipos con paginación
     * GET /tipos/paginated?page=0&size=10&sort=tipo,asc
     */
    getPaginated: async (page = 0, size = 10, sort = "tipo,asc") => {
        const response = await apiClient.get("/tipos/paginated", {
            params: { page, size, sort },
        });
        return response.data;
    },

    /**
     * Obtener solo tipos activos
     * GET /tipos/activos
     */
    getActive: async () => {
        const response = await apiClient.get("/tipos/activos");
        return response.data;
    },

    /**
     * Obtener un tipo por ID
     * GET /tipos/{id}
     */
    getById: async (id) => {
        const response = await apiClient.get(`/tipos/${id}`);
        return response.data;
    },

    /**
     * Buscar tipos por nombre (búsqueda parcial, case insensitive)
     * GET /tipos/buscar?tipo=nombre
     */
    searchByName: async (nombre) => {
        const response = await apiClient.get("/tipos/buscar", {
            params: { tipo: nombre },
        });
        return response.data;
    },

    /**
     * Verificar si existe un tipo con ese nombre
     * GET /tipos/existe?tipo=nombre
     */
    exists: async (nombre) => {
        const response = await apiClient.get("/tipos/existe", {
            params: { tipo: nombre },
        });
        return response.data.existe;
    },

    /**
     * Crear un nuevo tipo
     * POST /tipos
     * Body: { tipo: "Nombre", estatus: true }
     */
    create: async (tipoData) => {
        const response = await apiClient.post("/tipos", tipoData);
        return response.data;
    },

    /**
     * Actualizar un tipo existente
     * PUT /tipos/{id}
     * Body: { tipo: "Nombre actualizado", estatus: true }
     */
    update: async (id, tipoData) => {
        const response = await apiClient.put(`/tipos/${id}`, tipoData);
        return response.data;
    },

    /**
     * Activar un tipo (cambiar estatus a true)
     * PATCH /tipos/{id}/activar
     */
    activate: async (id) => {
        const response = await apiClient.patch(`/tipos/${id}/activar`);
        return response.data;
    },

    /**
     * Desactivar un tipo (cambiar estatus a false)
     * PATCH /tipos/{id}/desactivar
     */
    deactivate: async (id) => {
        const response = await apiClient.patch(`/tipos/${id}/desactivar`);
        return response.data;
    },

    /**
     * Eliminar un tipo (soft delete - lo desactiva)
     * DELETE /tipos/{id}
     */
    delete: async (id) => {
        const response = await apiClient.delete(`/tipos/${id}`);
        return response.data;
    },
};

export default TipoService;
