import PropTypes from "prop-types";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

/**
 * Formulario genérico reutilizable
 * Genera automáticamente campos basados en configuración
 */
const Form = ({
    fields = [],
    values = {},
    errors = {},
    onChange,
    onSubmit,
    submitText = "Guardar",
    cancelText = "Cancelar",
    onCancel,
    loading = false,
}) => {
    // Manejar el cambio de valor de un campo
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Si es checkbox, usar checked en lugar de value
        const finalValue = type === "checkbox" ? checked : value;
        
        onChange(name, finalValue);
    };

    // Renderizar un campo según su tipo
    const renderField = (field) => {
        const commonProps = {
            key: field.name,
            name: field.name,
            label: field.label,
            value: values[field.name] || "",
            onChange: handleChange,
            required: field.required,
            disabled: field.disabled || loading,
            error: errors[field.name],
            placeholder: field.placeholder,
        };

        // Renderizar según el tipo de campo
        switch (field.type) {
            case "select":
                return <Select {...commonProps} options={field.options} />;
            
            case "textarea":
                return (
                    <div className="mb-3" key={field.name}>
                        {field.label && (
                            <label htmlFor={field.name} className="form-label">
                                {field.label}
                                {field.required && <span className="text-danger ms-1">*</span>}
                            </label>
                        )}
                        <textarea
                            id={field.name}
                            name={field.name}
                            className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                            value={values[field.name] || ""}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            disabled={field.disabled || loading}
                            rows={field.rows || 3}
                        />
                        {errors[field.name] && (
                            <div className="invalid-feedback">{errors[field.name]}</div>
                        )}
                    </div>
                );

            case "checkbox":
                return (
                    <div className="mb-3 form-check" key={field.name}>
                        <input
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            className="form-check-input"
                            checked={values[field.name] || false}
                            onChange={handleChange}
                            disabled={field.disabled || loading}
                        />
                        <label className="form-check-label" htmlFor={field.name}>
                            {field.label}
                        </label>
                    </div>
                );

            default:
                return <Input {...commonProps} type={field.type || "text"} />;
        }
    };

    return (
        <form onSubmit={onSubmit}>
            {/* Renderizar todos los campos */}
            {fields.map((field) => renderField(field))}

            {/* Botones del formulario */}
            <div className="d-flex gap-2 justify-content-end mt-4">
                {onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                )}
                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Guardando...
                        </>
                    ) : (
                        submitText
                    )}
                </Button>
            </div>
        </form>
    );
};

Form.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string,
            type: PropTypes.string,
            required: PropTypes.bool,
            disabled: PropTypes.bool,
            placeholder: PropTypes.string,
            options: PropTypes.array,
            rows: PropTypes.number,
        })
    ).isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
};

export default Form;
