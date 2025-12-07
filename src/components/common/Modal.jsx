import PropTypes from "prop-types";
import Button from "./Button";

/**
 * Modal genérico reutilizable
 * Para mostrar formularios, confirmaciones, etc.
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    showFooter = true,
    onConfirm,
    confirmText = "Guardar",
    cancelText = "Cancelar",
    confirmVariant = "primary",
}) => {
    if (!isOpen) return null;

    // Mapeo de tamaños del modal
    const sizeClass = {
        sm: "modal-sm",
        md: "",
        lg: "modal-lg",
        xl: "modal-xl",
    }[size];

    return (
        <>
            {/* Backdrop del modal */}
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ zIndex: 1050 }}
            >
                <div className={`modal-dialog modal-dialog-centered ${sizeClass}`}>
                    <div className="modal-content">
                        {/* Header del modal */}
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="modal-body">{children}</div>

                        {/* Footer del modal (opcional) */}
                        {showFooter && (
                            <div className="modal-footer">
                                <Button variant="secondary" onClick={onClose}>
                                    {cancelText}
                                </Button>
                                {onConfirm && (
                                    <Button variant={confirmVariant} onClick={onConfirm}>
                                        {confirmText}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    showFooter: PropTypes.bool,
    onConfirm: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmVariant: PropTypes.string,
};

export default Modal;
