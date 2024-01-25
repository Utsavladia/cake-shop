import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navstyles.css";

export default function Nav() {
  const [clicked, setClicked] = useState(false);
  const [dropdown, setDropdownVisible] = useState(false);

  const handleDropdown = () => {
    setDropdownVisible(true);
  };

  const handleProfileMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleProfileMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleDropdownMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleDropdownMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="navitems">
      <ul className="nav-menu">
        <NavLink to="/" className="nav-links" exact>
          <i className="fa-solid fa-house"></i> Home
        </NavLink>
        <NavLink to="/cakes" className="nav-links">
          <i className="fa-solid fa-cake-candles"></i>
          Cakes
        </NavLink>
        <NavLink to="/products" className="nav-links">
          <i className="fa-solid fa-store"></i>
          Products
        </NavLink>
        {/* <Link to="/about" className="nav-links">
          <i className="fa-solid fa-phone"></i>
          contact
        </Link> */}
        <li
          className="nav-links"
          onClick={handleDropdown}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <i className="fa-solid fa-user"></i>
          Profile
          {dropdown && (
            <ul
              className="dropdown"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <NavLink to="/cart" className="dropdown-items">
                Cart
              </NavLink>

              <NavLink to="/orders" className="dropdown-items">
                Orders
              </NavLink>
              <NavLink to="/login" className="dropdown-items">
                Login/out
              </NavLink>
              {/* <Link to="/admin" className="dropdown-items">
                Admin
              </Link> */}
            </ul>
          )}
        </li>
      </ul>
      {/* <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? " fa-solid fa-times" : " fa-solid fa-bars"}></i>
      </div> */}
    </div>
  );
}
