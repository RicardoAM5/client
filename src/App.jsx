import './App.css'
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

const App = () => {
    return (
        <div>
            <ToastContainer />
            <Routes>
                {/* Públicas (redirigen al home si ya hay sesión) */}
                <Route element={<PublicRoute />}> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                {/* Privadas (requieren sesión) */}
                <Route element={<PrivateRoute />}> 
                    <Route path="/email-verify" element={<EmailVerify />} />
                </Route>

                {/* Home pública */}
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
