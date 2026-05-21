import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/adminLayout.css";

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await fetch("http://localhost/JatraPath_Website/backend/controllers/logout.php", {
            method: "POST",
            credentials: "include",
        });

        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="admin-wrapper">
            {sidebarOpen && (
                <div
                    className="overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* SIDEBAR */}
            <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <h2>JatraPath Admin</h2>

                <button onClick={() => navigate("/admin")}>Dashboard</button>
                <button onClick={() => navigate("/admin/destinations")}>Destinations</button>
                <button onClick={() => navigate("/admin/users")}>Users</button>
                <button onClick={() => navigate("/admin/orders")}>Orders</button>
                <button onClick={() => navigate("/admin/settings")}>Settings</button>

                <button className="logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* MAIN */}
            <div className="admin-main">

                {/* TOPBAR */}
                <div className="admin-topbar">
                    <button
                        className="menu-btn"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>

                    <h3>Admin Panel</h3>
                </div>

                {children}
            </div>
        </div>
    );
};

export default AdminLayout;