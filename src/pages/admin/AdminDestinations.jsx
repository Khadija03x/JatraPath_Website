import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "../../styles/admin/adminDestinations.css";

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    days: "",
    image: "",
    description: "",
  });

  /* =========================
     FETCH FUNCTION (REUSABLE)
  ========================= */
  const fetchDestinations = () => {
    fetch(
      "http://localhost/JatraPath_Website/backend/api/admin/adminDestinations.php"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API:", data);
        setDestinations(data.destinations || []);
      })
      .catch((err) => console.log(err));
  };

  /* =========================
     LOAD DATA ON MOUNT
  ========================= */
  useEffect(() => {
    fetchDestinations();
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     ADD DESTINATION
  ========================= */
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const res = await fetch(
        "http://localhost/JatraPath_Website/backend/api/admin/add_destination.php",
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Destination Added Successfully");

        // 🔥 IMPORTANT FIX: refresh list
        fetchDestinations();

        setFormData({
          name: "",
          location: "",
          price: "",
          days: "",
          image: "",
          description: "",
        });
      } else {
        alert(data.message || "Failed to add destination");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
     DELETE DESTINATION
  ========================= */
  const handleDelete = async (id) => {
    const form = new FormData();
    form.append("id", id);

    try {
      const res = await fetch(
        "http://localhost/JatraPath_Website/backend/api/admin/delete_destination.php",
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Deleted Successfully");

        // instant UI update
        setDestinations((prev) =>
          prev.filter((item) => item?.id !== id)
        );
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <AdminLayout activeTab="destinations">
    <div className="admin-destinations">

      <div className="admin-page-header">
        <h1>Manage Destinations</h1>
        <p>Add, edit, and delete travel destinations.</p>
      </div>

      {/* ADD FORM */}
      <form className="destination-form" onSubmit={handleAdd}>

        <input
          type="text"
          name="name"
          placeholder="Destination Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="days"
          placeholder="Days"
          value={formData.days}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Destination</button>
      </form>

      {/* DESTINATION LIST */}
      <div className="destination-grid">

        {destinations
          .filter(Boolean)
          .map((item) => (
            <div className="destination-card" key={item.id}>

              <img
                src={item.image || "https://via.placeholder.com/300"}
                alt={item.name || "Destination"}
              />

              <div className="destination-content">
                <h3>{item.name}</h3>
                <p>{item.location}</p>
                <span>৳ {item.price}</span>

                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>

            </div>
          ))}

      </div>

    </div>
    </AdminLayout>
  );
};

export default AdminDestinations;