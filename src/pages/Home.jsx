import Menubar from "../components/Menubar.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <Menubar />
            <Navbar />
            <Dashboard />
        </div>
    )
}

export default Home;