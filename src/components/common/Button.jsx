import PropTypes from "prop-types";

/**
 * Botón genérico reutilizable
 * Soporta diferentes variantes de Bootstrap
 */
const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    className = "",
    icon = null,
}) => {
    // Mapeo de tamaños
    const sizeClass = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
    }[size];

    return (
        <button
            type={type}
            className={`btn btn-${variant} ${sizeClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <i className={`bi bi-${icon} me-2`}></i>}
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "link",
    ]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.string,
};

export default Button;
