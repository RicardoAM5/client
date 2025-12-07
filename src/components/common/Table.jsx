import PropTypes from "prop-types";

/**
 * Tabla genérica reutilizable
 * Recibe columnas y datos, renderiza una tabla responsive
 */
const Table = ({
    columns = [],
    data = [],
    onEdit,
    onDelete,
    onToggleStatus,
    loading = false,
    emptyMessage = "No hay datos disponibles",
}) => {
    // Renderizar el valor de una celda según el tipo de columna
    const renderCell = (row, column) => {
        const value = row[column.key];

        // Si la columna tiene un render personalizado, usarlo
        if (column.render) {
            return column.render(value, row);
        }

        // Si es booleano, mostrar badge
        if (typeof value === "boolean") {
            return (
                <span className={`badge bg-${value ? "success" : "danger"}`}>
                    {value ? "Activo" : "Inactivo"}
                </span>
            );
        }

        return value;
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                {/* Encabezados de la tabla */}
                <thead className="table-light">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} style={{ width: column.width }}>
                                {column.header}
                            </th>
                        ))}
                        {/* Columna de acciones si hay funciones de editar o eliminar */}
                        {(onEdit || onDelete || onToggleStatus) && (
                            <th style={{ width: "120px" }}>Acciones</th>
                        )}
                    </tr>
                </thead>

                {/* Cuerpo de la tabla */}
                <tbody>
                    {/* Mostrar loading */}
                    {loading && (
                        <tr>
                            <td colSpan={columns.length + (onEdit || onDelete || onToggleStatus ? 1 : 0)} className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </td>
                        </tr>
                    )}

                    {/* Mostrar mensaje si no hay datos */}
                    {!loading && data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + (onEdit || onDelete || onToggleStatus ? 1 : 0)} className="text-center py-4 text-muted">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}

                    {/* Renderizar filas de datos */}
                    {!loading &&
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {/* Renderizar celdas */}
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>{renderCell(row, column)}</td>
                                ))}

                                {/* Columna de acciones */}
                                {(onEdit || onDelete || onToggleStatus) && (
                                    <td>
                                        <div className="d-flex gap-2">
                                            {onToggleStatus && (
                                                <button
                                                    className={`btn btn-sm ${
                                                        row.estatus ? "btn-success" : "btn-secondary"
                                                    }`}
                                                    onClick={() => onToggleStatus(row)}
                                                    title={row.estatus ? "Desactivar" : "Activar"}
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        padding: "0",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <i className={`bi bi-${row.estatus ? "check-circle" : "x-circle"}`}></i>
                                                </button>
                                            )}
                                            {onEdit && (
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => onEdit(row)}
                                                    title="Editar"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        padding: "0",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => onDelete(row)}
                                                    title="Eliminar"
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        padding: "0",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            width: PropTypes.string,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onToggleStatus: PropTypes.func,
    loading: PropTypes.bool,
    emptyMessage: PropTypes.string,
};

export default Table;
