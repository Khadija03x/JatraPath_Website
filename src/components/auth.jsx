import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/components/auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const BASE_URL = "https://jatrapath.kesug.com/backend/controllers";

    const url = isLogin
      ? `${BASE_URL}/login.php`
      : `${BASE_URL}/register.php`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });

      const text = await res.text();

      console.log(text);

      const data = JSON.parse(text);

      console.log("SERVER RESPONSE:", data);

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));

        alert(isLogin ? "Login Success" : "Registration Success");
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
      else if (data.status === "invalid_password") {
        alert("Wrong password");
      }
      else if (data.status === "user_not_found") {
        alert("User not found");
      }
      else if (data.status === "email_exists") {
        alert("Email already registered");
      }
      else {
        console.log("FULL SERVER RESPONSE:", data);

        alert(
          data.message ||
          data.error ||
          JSON.stringify(data)
        );
      }

    } catch (err) {
      console.error(err);
      alert("Server error or CORS issue");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Login to continue your journey"
              : "Join JatraPath today"}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" required />
          )}

          <input type="email" name="email" placeholder="Email Address" required />

          <input type="password" name="password" placeholder="Password" required />

          {!isLogin && (
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
          )}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
        <Link to="/" className="home-link">
          ⬅ Back to Home
        </Link>

      </div>
    </div>
  );
};

export default Auth;