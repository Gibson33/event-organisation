import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" end className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/Add Event" className="nav-link">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/Help" className="nav-link">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
