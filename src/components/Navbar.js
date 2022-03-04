import { Link, NavLink } from "react-router-dom";
import { logout, login } from "../assets/navbarItems";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user
              ? login(user.name).map((navbarItem) => (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to={navbarItem.path}
                    >
                      {navbarItem.label}
                    </NavLink>
                  </li>
                ))
              : logout.map((navbarItem) => (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to={navbarItem.path}
                    >
                      {navbarItem.label}
                    </NavLink>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
