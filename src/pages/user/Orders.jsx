import { useEffect, useState } from "react";
import "../../styles/pages/user/Orders.css";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost/JatraPath_Website/backend/api/get_orders.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, []);

  if (loading) {
    return <div className="orders-page">Loading orders...</div>;
  }

  return (
    <div className="orders-page">

      {/* HEADER */}
      <div className="orders-header">
        <div>
          <h1>My Orders 📦</h1>
          <p>Track your bookings and manage travel orders easily.</p>
        </div>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>You haven't booked any destination yet.</p>
        </div>
      ) : (

        <div className="orders-grid">

          {orders.map((order) => {

            const images = order.images?.split(",") || [];
            const destinations = order.destinations?.split(",") || [];
            const locations = order.locations?.split(",") || [];

            return (
              <div className="order-card" key={order.id}>

                {/* IMAGE */}
                <div className="order-image">

                  <img
                    src={images[0]}
                    alt="order"
                  />

                  <span className="status-badge confirmed">
                    Confirmed
                  </span>

                </div>

                {/* CONTENT */}
                <div className="order-content">

                  <div className="order-top">

                    <div>
                      <h2>{destinations[0]}</h2>
                      <p>📍 {locations[0]}</p>
                    </div>

                    <span className="order-id">
                      #{order.id}
                    </span>

                  </div>

                  {/* DETAILS */}
                  <div className="order-details">

                    <div className="detail-box">
                      <span>Order Date</span>
                      <h4>
                        {new Date(order.created_at).toLocaleDateString()}
                      </h4>
                    </div>

                    <div className="detail-box">
                      <span>Total Cost</span>
                      <h4>৳{order.total_price}</h4>
                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="order-actions">

                    <button className="details-btn">
                      View Details
                    </button>

                    <button className="invoice-btn">
                      Download Invoice
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default Orders;