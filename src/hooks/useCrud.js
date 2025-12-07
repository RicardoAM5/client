import { useState } from "react";
import axios from "axios";

/**
 * Hook personalizado para operaciones CRUD
 * Simplifica la gestión de estado y llamadas a API
 */
const useCrud = (apiUrl) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener todos los registros
    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(apiUrl);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err.message);
            console.error("Error al obtener datos:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Obtener un registro por ID
    const fetchById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${apiUrl}/${id}`);
            return response.data;
        } catch (err) {
            setError(err.message);
            console.error("Error al obtener registro:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Crear un nuevo registro
    const create = async (newData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(apiUrl, newData);
            setData((prev) => [...prev, response.data]);
            return response.data;
        } catch (err) {
            setError(err.message);
            console.error("Error al crear registro:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar un registro existente
    const update = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${apiUrl}/${id}`, updatedData);
            setData((prev) =>
                prev.map((item) => (item.id === id ? response.data : item))
            );
            return response.data;
        } catch (err) {
            setError(err.message);
            console.error("Error al actualizar registro:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un registro
    const remove = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            setError(err.message);
            console.error("Error al eliminar registro:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        fetchAll,
        fetchById,
        create,
        update,
        remove,
    };
};

export default useCrud;
