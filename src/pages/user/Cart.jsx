import { useEffect, useState } from "react";
import "../../styles/pages/user/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH CART
  ========================= */
  const fetchCart = async () => {
    try {
      const res = await fetch(
        "http://localhost/JatraPath_Website/backend/api/cart.php",
        {
          credentials: "include",
        },
      );

      const data = await res.json();

      console.log("CART DATA:", data);

      setCartItems(data.cart || []);
    } catch (error) {
      console.log("Fetch Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* =========================
     UPDATE PERSONS
  ========================= */
  const updatePersons = async (id, newCount) => {
    if (newCount < 1) return;

    try {
      const formData = new FormData();

      formData.append("id", id);
      formData.append("persons", newCount);

      const res = await fetch(
        "http://localhost/JatraPath_Website/backend/api/cart_update.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      const data = await res.json();

      console.log("UPDATE RESPONSE:", data);

      if (data.status === "success") {
        fetchCart();
      }
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  /* =========================
     DELETE ITEM
  ========================= */
  const removeItem = async (id) => {
    const confirmDelete = window.confirm("Remove this item from cart?");

    if (!confirmDelete) return;

    try {
      const formData = new FormData();

      formData.append("id", id);

      const res = await fetch(
        "http://localhost/JatraPath_Website/backend/api/cart_delete.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      const data = await res.json();

      console.log("DELETE RESPONSE:", data);

      if (data.status === "success") {
        fetchCart();
      }
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  /* =========================
     TOTALS
  ========================= */
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.persons),
    0,
  );

  const serviceFee = 500;

  const total = subtotal + serviceFee;

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="cart-page">
        <h2>Loading cart...</h2>
      </div>
    );
  }
  /* =========================
     CHECKOUT
  ========================= */
  const checkout = async () => {
    try {
      const res = await fetch(
        "http://localhost/JatraPath_Website/backend/api/checkout.php",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Order placed successfully!");
        fetchCart(); // refresh cart (now empty)
      } else if (data.status === "empty") {
        alert("Cart is empty");
      } else {
        alert("Checkout failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cart-page">
      {/* HEADER */}
      <div className="cart-header">
        <div>
          <h1>Your Travel Cart 🛒</h1>

          <p>Review your selected destinations and continue booking.</p>
        </div>
      </div>

      {/* EMPTY */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <div className="cart-layout">
          {/* LEFT */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-content">
                  {/* TOP */}
                  <div className="cart-top">
                    <div>
                      <h3>{item.name}</h3>

                      <p>📍 {item.location}</p>

                      <span>{item.days} Days Tour</span>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>

                  {/* BOTTOM */}
                  <div className="cart-bottom">
                    <div className="quantity-box">
                      <button
                        onClick={() => updatePersons(item.id, item.persons - 1)}
                      >
                        -
                      </button>

                      <span>{item.persons}</span>

                      <button
                        onClick={() => updatePersons(item.id, item.persons + 1)}
                      >
                        +
                      </button>
                    </div>

                    <h2>৳{Number(item.price) * Number(item.persons)}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="cart-summary">
            <h2>Booking Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Service Fee</span>
              <span>৳{serviceFee}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>৳{total}</span>
            </div>

            <button className="checkout-btn" onClick={checkout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
