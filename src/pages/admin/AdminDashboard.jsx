import { useEffect, useState } from "react";

import AdminLayout from "./AdminLayout";
import "../../styles/admin/adminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  /* FETCH ADMIN DATA */
  useEffect(() => {
    fetch(
      "http://localhost/JatraPath_Website/backend/api/overview.php",
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AdminLayout>
      <div className="admin-container">
      {/* MAIN */}
      <div className="admin-main">

        {/* TOP BAR (ONLY ONCE) */}
        <div className="admin-topbar">
          <h3>Admin Dashboard</h3>

          <div className="admin-info">
            👤 {data?.user?.name || "Admin"}
          </div>

        </div>

        {/* DASHBOARD */}
        <div className="dashboard-content">

          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Users</h4>
              <p>{data?.stats?.users || 0}</p>
            </div>

            <div className="stat-card">
              <h4>Total Destinations</h4>
              <p>{data?.stats?.destinations || 0}</p>
            </div>

            <div className="stat-card">
              <h4>Total Orders</h4>
              <p>{data?.stats?.orders || 0}</p>
            </div>

            <div className="stat-card">
              <h4>Cart Items</h4>
              <p>{data?.stats?.cart_items || 0}</p>
            </div>
          </div>

          <div className="recent-box">
            <h3>Recent Bookings</h3>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Destination</th>
                  <th>Persons</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>NULL</td>
                  <td>NULL</td>
                  <td>NULL</td>
                  <td>NULL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminDashboard;