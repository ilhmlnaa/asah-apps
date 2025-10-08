import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="logo">
        <img src="/pencil.png" alt="Header Logo" />
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          className="logo-text"
        >
          Personal Notes
        </Link>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Catatan Aktif
            </Link>
          </li>
          <li>
            <Link
              to="/archived"
              className={location.pathname === "/archived" ? "active" : ""}
            >
              Arsip
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
