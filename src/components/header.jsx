import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header style={{ position: "relative" }}>
      <nav>
        <NavLink to="/" className="logo">
          <span>J</span>atraPath
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/destinations"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Destinations
            </NavLink>
          </li>

          <li className="dropdown">
            <a href="#">Services ▾</a>

            <ul className="dropdown-menu">
              <li>
                <NavLink
                  to="/gift-cards"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Gift Cards
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/safety-info"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Safety Info
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="dropdown">
            <a href="#">More ▾</a>

            <div className="dropdown-menu-div">
              <ul className="dropdown-menu">
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Blog
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  FAQ
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/terms"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Terms of Service
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Privacy Policy
                </NavLink>
              </li>

              <li>
                <a href="/JatraPath_Website/JatraPath_V0.1/old.html">
                  V0.1
                </a>
              </li>
            </ul>
            </div>
          </li>
        </ul>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "login active-login" : "login"
          }
        >
          Login
        </NavLink>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/destinations"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              Destinations
            </NavLink>
          </li>

          <li>
            <button
              className="mobile-toggle"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services ▾
            </button>

            <ul className={`mobile-sub${servicesOpen ? " open" : " collapsed"}`}>
              <li>
                <NavLink
                  to="/gift-cards"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Gift Cards
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/safety-info"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Safety Info
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <button
              className="mobile-toggle"
              onClick={() => setMoreOpen(!moreOpen)}
            >
              More ▾
            </button>

            <ul className={`mobile-sub${moreOpen ? " open" : " collapsed"}`}>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Blog
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  FAQ
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/terms"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Terms of Service
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                >
                  Privacy Policy
                </NavLink>
              </li>

              <li>
                <a href="/JatraPath_Website/JatraPath_V0.1/old.html">
                  V0.1
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <NavLink to="/login" className="mobile-login">
          Login
        </NavLink>
      </div>
    </header>
  );
};

export default Header;