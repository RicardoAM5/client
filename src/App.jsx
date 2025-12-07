import './App.css'
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import TipoSimplified from "./pages/TipoSimplified.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

const App = () => {
    return (
        <div>
            <ToastContainer />
            <Routes>
                {/* Rutas públicas (sin autenticación) */}
                <Route element={<PublicRoute />}> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                {/* Rutas privadas (requieren autenticación + Navbar siempre visible) */}
                <Route element={<PrivateRoute />}> 
                    <Route path="/" element={<Home />} />
                    <Route path="/email-verify" element={<EmailVerify />} />
                    <Route path="/administracion/tipo" element={<TipoSimplified />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
