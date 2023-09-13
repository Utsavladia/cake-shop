import React, { useEffect, useState } from "react";
import Menu from "../Cakes/Menu";
import "./styles.css"



const ItemOfOrders = ({ item}) => {
  const menuid = item.cakeId;

  // Use the find method to search for the menu item
  const menuItem = Menu.find((menuItem) => menuItem.id === menuid);
  
  const [message, setMessage] = useState(item.message);
  
  const updatedPrice = item.pounds * menuItem.price;





  
  
  return (
    <div className="order-item-card">
      <img src={menuItem.image} alt="CakeImage" />
      <header>
        <p className="item-name">{menuItem.name}</p>
      
        <div>
            <div className="flavour-text-cart">
            flavour - {menuItem.flavour}
            </div>
            <span className="pounds-cart">  <b>{item.pounds} Pounds</b></span>

            <span className="rating-box-cart">
            <span className="rating-text-cart">{menuItem.rating}</span>
            <span className="starForProduct-cart">★</span>
            </span>
            
        </div>
        <div>
            <p className="message-heading">Added messages </p>
            <p className="message-text">{message? message : "No messages..."}</p>
        </div>
        <div>
        
        <span className="price-box-cart">
          <span className="rupee-sign-cart">₹</span>
          <span className="price-cart">{updatedPrice}</span>
          
        </span>


        </div>

      </header>
    </div>
  );
};

export default ItemOfOrders;