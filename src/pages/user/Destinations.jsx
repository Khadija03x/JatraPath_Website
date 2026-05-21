import { useEffect, useState } from "react";
import "../../styles/pages/user/Destinations.css";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");

  /* FETCH FROM PHP */
  useEffect(() => {
    fetch("http://localhost/JatraPath_Website/backend/api/destinations.php")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data?.destinations || []);
      });
  }, []);

  /* ADD TO CART */
  const addToCart = (id) => {
    const formData = new FormData();
    formData.append("destination_id", id);

    fetch("http://localhost/JatraPath_Website/backend/api/cart_add.php", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "added") {
          alert("Added to cart!");
        } else {
          alert("Failed");
        }
      });
  };

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="destinations-page">

      {/* HEADER */}
      <div className="destination-header">

        <div>
          <h1>Explore Destinations 🌍</h1>
          <p>Discover breathtaking places across Bangladesh.</p>
        </div>

        <div className="destination-search">

          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>Search</button>

        </div>

      </div>

      {/* GRID */}
      <div className="destinations-grid">

        {filtered.map((destination) => (
          <div className="destination-card" key={destination.id}>

            <div className="destination-image">
              <img src={destination.image} alt={destination.name} />

              <span className="destination-price">
                {destination.price}
              </span>
            </div>

            <div className="destination-content">

              <h3>{destination.name}</h3>
              <p>📍 {destination.location}</p>

              <div className="destination-actions">

                <button className="view-btn">
                  View Details (working..)
                </button>

                <button
                  className="cart-btn"
                  onClick={() => addToCart(destination.id)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Destinations;