import { useState } from "react";
import "../styles/components/userLayout.css";

const UserLayout = ({ activeTab, setActiveTab, children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="overlay active"
          onClick={toggleMenu}
        ></div>
      )}

      <div className="dashboard-container">

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>

          <h2>JatraPath</h2>

          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => changeTab("overview")}
          >
            Overview
          </button>

          <button
            className={activeTab === "destinations" ? "active" : ""}
            onClick={() => changeTab("destinations")}
          >
            Destinations
          </button>

          <button
            className={activeTab === "cart" ? "active" : ""}
            onClick={() => changeTab("cart")}
          >
            Cart
          </button>

          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => changeTab("orders")}
          >
            Orders
          </button>

          <button
            className={activeTab === "giftcards" ? "active" : ""}
            onClick={() => changeTab("giftcards")}
          >
            Gift Cards
          </button>

          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => changeTab("profile")}
          >
            Profile
          </button>

        </div>

        {/* Main Content */}
        <div className="main-content">
          {children}
        </div>

      </div>
    </>
  );
};

export default UserLayout;