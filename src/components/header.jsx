import { useState } from "react";
import "../styles/components/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header style={{ position: "relative" }}>
      <nav>
        <a href="/" className="logo"><span>J</span>atraPath</a>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/destinations">Destinations</a></li>

          <li className="dropdown">
            <a href="#">Services +</a>
            <ul className="dropdown-menu">
              <li><a href="/gift-cards">Gift Cards</a></li>
              <li><a href="/safety-info">Safety Info</a></li>
            </ul>
          </li>

          <li className="dropdown">
            <a href="#">More +</a>
            <ul className="dropdown-menu">
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/JatraPath_Website/JatraPath_V0.1/old.html">V0.1</a></li>
            </ul>
          </li>
        </ul>
        <a href="/login" className="login">Login</a>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/destinations">Destinations</a></li>

          <li>
            <button
              className="mobile-toggle"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services {servicesOpen ? "∧" : "›"}
            </button>

            <ul className={`mobile-sub${servicesOpen ? "" : " collapsed"}`}>
              <li><a href="/gift-cards">Gift Cards</a></li>
              <li><a href="/safety-info">Safety Info</a></li>
            </ul>
          </li>

          <li>
            <button
              className="mobile-toggle"
              onClick={() => setMoreOpen(!moreOpen)}
            >
              More {moreOpen ? "∧" : "›"}
            </button>

            <ul className={`mobile-sub${moreOpen ? "" : " collapsed"}`}>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </li>
        </ul>

        <a href="/login" className="mobile-login">Login</a>
      </div>
    </header>
  );
};

export default Header;