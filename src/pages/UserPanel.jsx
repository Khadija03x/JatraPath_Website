import { useEffect, useState } from "react";

import UserLayout from "../components/userLayout.jsx";

import Overview from "./user/Overview";
import Destinations from "./user/Destinations";
import Cart from "./user/Cart";
import Orders from "./user/Orders";
import Profile from "./user/Profile";
import GiftCards from "./user/GiftCards";

const UserDashboard = () => {

  useEffect(() => {
    document.title = "JatraPath | User Dashboard";
  }, []);

  const [activeTab, setActiveTab] = useState("overview");

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
    <UserLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </UserLayout>
  );
};

export default UserDashboard;