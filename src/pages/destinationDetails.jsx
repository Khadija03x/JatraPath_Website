import { NavLink, useParams } from "react-router-dom";

import Layout from "../components/layout";
import { destinations } from "../data/destinationsData";

import "../styles/pages/destinationDetails.css";

const DestinationDetails = () => {

  const { id } = useParams();

  const place = destinations.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!place) {
    return (
      <Layout>
        <h1>Destination Not Found</h1>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="details-page">

        <div className="details-hero">

          <img
            src={place.image}
            alt={place.name}
          />

          <div className="details-overlay">
            <h1>{place.name}</h1>
          </div>

        </div>

        <div className="details-content">

          {/* LEFT SIDE */}
          <div className="details-left">

            <h2>About This Tour</h2>

            <p>{place.description}</p>

            <div className="package-price">
              Tour Package Price
              <span>{place.price}</span>
            </div>

            <NavLink
              className="cart-btn"
              to="/login"
            >
              Add To Cart
            </NavLink>

          </div>

          {/* RIGHT SIDE */}
          <div className="details-right">

            <div className="map-card">

              <h3>Destination Map</h3>

              <img
                src={place.map}
                alt={`${place.name} map`}
                className="map-image"
              />

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
};

export default DestinationDetails;