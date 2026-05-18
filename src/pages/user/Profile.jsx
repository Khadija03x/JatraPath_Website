import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/user/Profile.css";

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    orders: 0,
    cart_items: 0,
    gift_cards: 0,
    saved_places: 0,
  });

  /* FETCH REAL DATA */
  useEffect(() => {

    fetch("http://localhost/JatraPath_Website/backend/api/overview.php", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {

        if (data.status === "success") {
          setStats(data.stats);
        }

      })
      .catch(err => console.log("Profile stats error:", err));

  }, []);

  /* LOGOUT */
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div className="profile-page">

      {/* TOP */}
      <div className="profile-header">

        <div className="profile-cover"></div>

        <div className="profile-user">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>

            <span className="profile-badge">
              Premium Traveler ✈
            </span>
          </div>

        </div>

      </div>

      {/* STATS (NOW DYNAMIC) */}
      <div className="profile-stats">

        <div className="profile-stat-card">
          <h3>{stats.orders}</h3>
          <p>Total Trips</p>
        </div>

        <div className="profile-stat-card">
          <h3>{stats.cart_items}</h3>
          <p>Cart Items</p>
        </div>

        <div className="profile-stat-card">
          <h3>{stats.gift_cards}</h3>
          <p>Gift Cards</p>
        </div>

        <div className="profile-stat-card">
          <h3>{stats.saved_places}</h3>
          <p>Saved Places</p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="profile-content">

        {/* LEFT */}
        <div className="profile-card">

          <h3>Personal Information</h3>

          <div className="profile-field">
            <label>Full Name</label>
            <input type="text" value={user?.name || ""} readOnly />
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            <input type="email" value={user?.email || ""} readOnly />
          </div>

          <div className="profile-field">
            <label>Account Type</label>
            <input type="text" value="Traveler Account" readOnly />
          </div>

        </div>

        {/* RIGHT */}
        <div className="profile-card">

          <h3>Quick Actions</h3>

          <div className="quick-actions">

            <button onClick={() => navigate("/destinations")}>
              🌍 Explore Destinations
            </button>

            <button onClick={() => navigate("/cart")}>
              🛒 View Cart
            </button>

            <button onClick={() => navigate("/orders")}>
              📦 My Orders
            </button>

            <button onClick={() => navigate("/giftcards")}>
              🎁 Gift Cards
            </button>

          </div>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;