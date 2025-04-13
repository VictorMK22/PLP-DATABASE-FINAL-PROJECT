import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div>
          <h4>Magical Loans</h4>
          <p>Bringing enchanted financial solutions to you.</p>
        </div>
        <div className="links">
          <h4>Quick Links</h4>
          <ul className="link-list">
            <li className="link">
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"./loan-amounts"}> Loans</Link>
            </li>
            <li>
              <Link to={"./contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>Email: help@magicalloans.com</p>
          <p>Phone: +254795703599</p>
        </div>
      </div>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Magical Loans. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
