import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context.jsx";
import "./NavBar.css";

/**
 * NavBar Component
 * ----------------
 * A responsive navigation bar that includes:
 * - A hamburger menu for mobile
 * - Links to Dashboard, Add Event, and Help pages
 * - A logout button that clears session and redirects to login
 */
export default function NavBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  //  Handle user logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      {/*  Hamburger Menu (visible on mobile)  */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Links */}
      <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/dashboard"
              end
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addEvent"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Add Event
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/help"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Help
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout Button  */}
      <button
        className="logout-btn"
        onClick={handleLogout}
        title="Log out"
        aria-label="Log out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </nav>
  );
}
