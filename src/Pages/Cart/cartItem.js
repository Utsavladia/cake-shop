import React, { useState } from "react";
import Menu from "../Cakes/Menu";
import "./styles.css"



const ItemOfCart = ({ item, onRemove }) => {
  const menuid = item.cakeId;

  // Use the find method to search for the menu item
  const menuItem = Menu.find((menuItem) => menuItem.id === menuid);
  const [pounds, setPounds] = useState(item.pounds);
  const [message, setMessage] = useState(item.message);
  const handleIncreasePounds = () => {
    setPounds(pounds + 1);
  };
  const handleDecreasePounds = () => {
    if (pounds > 1) {
      setPounds(pounds - 1);
    }
  };

  
  const updatedPrice = pounds * menuItem.price;

  const handleRemove = () => {
    // Call the onRemove function with the item's ID to remove it from the cart
    onRemove(item.id);
  };


  
  
  return (
    <div className="cart-item-card">
      <img src={menuItem.image} alt="CakeImage" />
      <header>
        <h1>{menuItem.name}</h1>
        <div>

        <span>
          <div className="flavour-text-cart">flavour:{menuItem.flavour} </div>
        </span>
        <div className="rating-cart">
        <span className="rating-box-cart">
            <span className="rating-text-cart">{menuItem.rating}</span>
            <span className="starForProduct-cart">★</span>
          </span>
          </div>

          <span className="pounds-cart">
          <div className="pounds-text-cart">
            <b>{pounds} Pounds</b>
          </div>
          <div className="pound-options-cart">
          <button onClick={handleIncreasePounds}>+</button>
            <button onClick={handleDecreasePounds}>-</button>
          </div>
        </span>
        <textarea
          className="message-cart"
          placeholder={item.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        </div>
        <div>
        <button className="remove-button-cart" onClick={handleRemove}>
          Remove
        </button>
        <span className="price-box-cart">
          <span className="rupee-sign-cart">₹</span>
          <span className="price-cart">{updatedPrice}</span>
          
        </span>


        </div>
      </header>
    </div>
  );
};

export default ItemOfCart;