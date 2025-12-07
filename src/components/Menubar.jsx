import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";

const Menubar = () => {
    const navigate = useNavigate();
    const {userData, backendURL, setUserData, setIsLoggedIn} = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/logout");
            if (response.status === 200) {
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/")
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(msg);
        }
    }

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/send-otp");
            if (response.status === 200) {
                navigate("/email-verify");
                toast.success("OTP has been sent successfully.");
            } else {
                toast.error("Unable to send OTP!");
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(msg);
        }
    }

    return (
        <nav className="navbar fixed-top bg-white border-bottom px-4 py-2 shadow-sm d-flex justify-content-between align-items-center">
                
                {/* Logo y nombre de la aplicación - Izquierda */}
                <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold fs-5 text-dark">RAMSolutions</span>
                </div>

                {/* Usuario boton redondo */}
                {userData ? (
                    <div className="position-relative" ref={dropdownRef}>
                        <div 
                            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center border border-2 border-dark"
                            style={{
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                                userSelect: "none",
                                fontSize: "1rem",
                                fontWeight: "bold"
                            }}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            title={userData.name}
                        >
                            {userData.name[0].toUpperCase()}
                        </div>

                        {/* Menú desplegable */}
                        {dropdownOpen && (
                            <div 
                                className="position-absolute bg-white rounded shadow-lg border"
                                style={{
                                    top: "55px",
                                    right: 0,
                                    zIndex: 1000,
                                    minWidth: "180px"
                                }}
                            >
                                <div className="p-2 border-bottom">
                                    <small className="text-muted">Hola, {userData.name}</small>
                                </div>
                                
                                {!userData.isAccountVerified && (
                                    <div 
                                        className="dropdown-item py-2 px-3" 
                                        style={{cursor: "pointer"}} 
                                        onClick={sendVerificationOtp}
                                    >
                                        <i className="bi bi-envelope me-2"></i>
                                        Verificar email
                                    </div>
                                )}
                                
                                <div 
                                    className="dropdown-item py-2 px-3 text-danger" 
                                    style={{cursor: "pointer"}}
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Cerrar sesión
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button 
                        className="btn btn-dark rounded-pill px-4 py-2" 
                        onClick={() => navigate("/login")}
                    >
                        Iniciar sesión
                        <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                )}
        </nav>
    )
}

export default Menubar;