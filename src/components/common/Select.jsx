import PropTypes from "prop-types";

/**
 * Select genérico reutilizable
 * Para dropdowns y selección de opciones
 */
const Select = ({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    disabled = false,
    error = "",
    className = "",
    placeholder = "Seleccione una opción",
}) => {
    return (
        <div className={`mb-3 ${className}`}>
            {/* Etiqueta del select */}
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            {/* Select */}
            <select
                id={name}
                name={name}
                className={`form-select ${error ? "is-invalid" : ""}`}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Mensaje de error */}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
            label: PropTypes.string,
        })
    ),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Select;
