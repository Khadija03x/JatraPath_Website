import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/adminLayout.css";

const AdminLayout = ({ activeTab, children }) => {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {

    await fetch(
      "http://localhost/JatraPath_Website/backend/controllers/logout.php",
      {
        method: "POST",
        credentials: "include",
      }
    );

    localStorage.removeItem("user");

    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-wrapper">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>

        <h2>JatraPath Admin</h2>

        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => {
            navigate("/admin");
            closeSidebar();
          }}
        >
          Dashboard
        </button>

        <button
          className={activeTab === "destinations" ? "active" : ""}
          onClick={() => {
            navigate("/admin/destinations");
            closeSidebar();
          }}
        >
          Destinations
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => {
            navigate("/admin/users");
            closeSidebar();
          }}
        >
          Users
        </button>

        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => {
            navigate("/admin/orders");
            closeSidebar();
          }}
        >
          Orders
        </button>

        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => {
            navigate("/admin/settings");
            closeSidebar();
          }}
        >
          Settings
        </button>

        <button
          className="logout"
          onClick={handleLogout}
        >
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

        {/* PAGE CONTENT */}
        {children}

      </div>

    </div>
  );
};

export default AdminLayout;