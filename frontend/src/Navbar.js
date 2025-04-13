import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/admin/*">
          Admin Dashboard
        </Link>
        <Link className="nav-link" to="/register">
          Register
        </Link>
        <Link className="nav-link" to="/api-message">
          Api Message
        </Link>
        <Link className="nav-link" to="/users">
          Users
        </Link>
        <Link className="nav-link" to="/transaction-history">
          Transaction History
        </Link>
        <Link className="nav-link" to="/contact">
          Contact Us
        </Link>
        <Link className="nav-link" to="/repayment">
          Repayment Schedules
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
