import PropTypes from "prop-types";

/**
 * Input genérico reutilizable
 * Soporta diferentes tipos de inputs y validaciones
 */
const Input = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    error = "",
    className = "",
}) => {
    return (
        <div className={`mb-3 ${className}`}>
            {/* Etiqueta del input */}
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            {/* Input */}
            <input
                type={type}
                id={name}
                name={name}
                className={`form-control ${error ? "is-invalid" : ""}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />

            {/* Mensaje de error */}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
};

export default Input;
