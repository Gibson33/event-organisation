import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context.jsx";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-links-container">
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" end className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/addEvent" className="nav-link">
              Add Event
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className="nav-link">
              Help
            </NavLink>
          </li>
        </ul>
      </div>

      <button className="logout-btn" onClick={handleLogout} title="Log out">
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
