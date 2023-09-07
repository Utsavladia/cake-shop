import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navstyles.css";

export default function Nav() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="navitems">
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <Link to="/" className="nav-links">
          <i className="fa-solid fa-house"></i> Home
        </Link>
        <Link to="/cakes" className="nav-links">
          <i className="fa-solid fa-cake-candles"></i>
          Cakes
        </Link>
        <Link to="/products" className="nav-links">
          <i className="fa-solid fa-store"></i>
          Products
        </Link>
        <Link to="/about" className="nav-links">
          <i className="fa-solid fa-phone"></i>
          contact
        </Link>
        <Link to="/signup" className="nav-links">
          <i className="fa-solid fa-user"></i>
          Signup
        </Link>
      </ul>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? " fa-solid fa-times" : " fa-solid fa-bars"}></i>
      </div>
    </div>
  );
}
