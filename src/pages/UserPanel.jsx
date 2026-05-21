import { useState } from "react";
import "../styles/pages/UserPanel.css";

import Overview from "./user/Overview";
import Destinations from "./user/Destinations";
import Cart from "./user/Cart";
import Orders from "./user/Orders";
import Profile from "./user/Profile";
import GiftCards from "./user/GiftCards";
import { useEffect } from "react";
const UserDashboard = () => {
  useEffect(() => {
    document.title = "JatraPath | User Dashboard";
  }, []);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // auto close on mobile
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;

      case "destinations":
        return <Destinations />;

      case "cart":
        return <Cart />;

      case "orders":
        return <Orders />;

      case "giftcards":
        return <GiftCards />;

      case "profile":
        return <Profile />;

      default:
        return <Overview />;
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay active" onClick={toggleMenu}></div>
      )}

      <div className="dashboard-container">

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
          <h2>JatraPath</h2>

          <button onClick={() => changeTab("overview")}>
            Overview
          </button>

          <button onClick={() => changeTab("destinations")}>
            Destinations
          </button>

          <button onClick={() => changeTab("cart")}>
            Cart
          </button>

          <button onClick={() => changeTab("orders")}>
            Orders
          </button>

          <button onClick={() => changeTab("giftcards")}>
            Gift Cards
          </button>

          <button onClick={() => changeTab("profile")}>
            Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {renderContent()}
        </div>

      </div>
    </>
  );
};

export default UserDashboard;