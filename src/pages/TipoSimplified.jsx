import { useState, useEffect } from "react";
import { Table, Modal, Form, Button } from "../components/common";
import TipoService from "../services/TipoService";
import { toast } from "react-toastify";

/**
 * Página de gestión de Tipos - Versión con Service
 */
const TipoSimplified = () => {
    // Estados del componente
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentTipo, setCurrentTipo] = useState(null);
    const [formValues, setFormValues] = useState({ tipo: "", estatus: true });
    const [formErrors, setFormErrors] = useState({});

    // Cargar datos al iniciar
    useEffect(() => {
        fetchTipos();
    }, []);

    // Obtener todos los tipos desde la API
    const fetchTipos = async () => {
        setLoading(true);
        try {
            const data = await TipoService.getAll();
            setTipos(data);
        } catch (error) {
            console.error("Error al cargar tipos:", error);
            toast.error("Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    };

    // Configuración de la tabla
    const columns = [
        { header: "ID", key: "idTipo", width: "80px" },
        { header: "Tipo", key: "tipo" },
        { header: "Estatus", key: "estatus", width: "120px" },
    ];

    // Configuración del formulario
    const formFields = [
        {
            name: "tipo",
            label: "Nombre del Tipo",
            type: "text",
            required: true,
            placeholder: "Ej: Tipo A",
        },
        {
            name: "estatus",
            label: "Activo",
            type: "checkbox",
        },
    ];

    // Abrir modal para crear
    const handleCreate = () => {
        setCurrentTipo(null);
        setFormValues({ tipo: "", estatus: true });
        setFormErrors({});
        setIsModalOpen(true);
    };

    // Abrir modal para editar
    const handleEdit = (tipo) => {
        setCurrentTipo(tipo);
        setFormValues({ tipo: tipo.tipo, estatus: tipo.estatus });
        setFormErrors({});
        setIsModalOpen(true);
    };

    // Abrir modal de eliminación
    const handleDelete = (tipo) => {
        setCurrentTipo(tipo);
        setIsDeleteModalOpen(true);
    };

    // Manejar cambios en el formulario
    const handleFieldChange = (name, value) => {
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validar formulario
    const validateForm = () => {
        const errors = {};
        if (!formValues.tipo.trim()) {
            errors.tipo = "El nombre del tipo es requerido";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Guardar tipo
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            if (currentTipo) {
                await TipoService.update(currentTipo.idTipo, formValues);
                toast.success("Tipo actualizado correctamente");
            } else {
                await TipoService.create(formValues);
                toast.success("Tipo creado correctamente");
            }
            fetchTipos();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al guardar:", error);
            toast.error(error.response?.data?.message || "Error al guardar el tipo");
        } finally {
            setLoading(false);
        }
    };

    // Confirmar eliminación
    const confirmDelete = async () => {
        setLoading(true);
        try {
            await TipoService.delete(currentTipo.idTipo);
            toast.success("Tipo eliminado correctamente");
            fetchTipos();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error al eliminar:", error);
            toast.error(error.response?.data?.message || "Error al eliminar el tipo");
        } finally {
            setLoading(false);
        }
    };

    // Cambiar el estatus (activar/desactivar)
    const handleToggleStatus = async (tipo) => {
        setLoading(true);
        try {
            if (tipo.estatus) {
                await TipoService.deactivate(tipo.idTipo);
                toast.success("Tipo desactivado correctamente");
            } else {
                await TipoService.activate(tipo.idTipo);
                toast.success("Tipo activado correctamente");
            }
            fetchTipos();
        } catch (error) {
            console.error("Error al cambiar estatus:", error);
            toast.error(error.response?.data?.message || "Error al cambiar el estatus");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Tipos</h2>
                <Button icon="plus-circle" onClick={handleCreate}>
                    Nuevo Tipo
                </Button>
            </div>

            <Table
                columns={columns}
                data={tipos}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentTipo ? "Editar Tipo" : "Nuevo Tipo"}
                showFooter={false}
            >
                <Form
                    fields={formFields}
                    values={formValues}
                    errors={formErrors}
                    onChange={handleFieldChange}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    loading={loading}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirmar Eliminación"
                confirmText="Eliminar"
                confirmVariant="danger"
                onConfirm={confirmDelete}
            >
                <p>
                    ¿Eliminar el tipo <strong>{currentTipo?.tipo}</strong>?
                </p>
                <p className="text-muted mb-0">Esta acción no se puede deshacer.</p>
            </Modal>
        </div>
    );
};

export default TipoSimplified;
