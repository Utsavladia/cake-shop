import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navstyles.css";


export default function Nav() {
  const [clicked, setClicked] = useState(false);
  const [dropdown, setDropdownVisible] = useState(false);


  const handleDropdown=() =>{
    setDropdownVisible(true);
  }

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
      <ul className= "nav-menu">
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
        {/* <Link to="/about" className="nav-links">
          <i className="fa-solid fa-phone"></i>
          contact
        </Link> */}
        <li className="nav-links" onClick={handleDropdown}
         onMouseEnter={handleProfileMouseEnter}
           onMouseLeave={handleProfileMouseLeave}
           >
          <i className="fa-solid fa-user"></i>
            Profile
            {dropdown && (
            <ul className="dropdown"
            onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}>
            
            <Link to="/cart" className="dropdown-items" >Cart</Link>
        
            <Link to="/orders" className="dropdown-items">Orders</Link>
            <Link to="/login" className="dropdown-items">Login/out</Link>

            </ul>
            )

            }


        </li>
        
      </ul>
      {/* <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? " fa-solid fa-times" : " fa-solid fa-bars"}></i>
      </div> */}
    </div>
  );
}
