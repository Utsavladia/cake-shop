import React, { useEffect, useState } from "react";
import Menu from "../Cakes/Menu";
import "./styles.css"



const ItemOfCart = ({ item, onRemove , updateTotalPrice }) => {
  const menuid = item.cakeId;

  // Use the find method to search for the menu item
  const menuItem = Menu.find((menuItem) => menuItem.id === menuid);
  
  const [message, setMessage] = useState(item.message);
  
  const updatedPrice = item.pounds * menuItem.price;

  const handleRemove = () => {
    // Call the onRemove function with the item's ID to remove it from the cart
    onRemove(item.id, updatedPrice);


  };

  useEffect(()=>{
    updateTotalPrice(updatedPrice)

  },[updatedPrice])




  
  
  return (
    <div className="cart-item-card">
      <img src={menuItem.image} alt="CakeImage" />
      <header>
        <p className="item-name">{menuItem.name}</p>
      
        <div>
            <div className="flavour-text-cart">
            flavour - {menuItem.flavour}
            </div>
            <span className="rating-box-cart">
            <span className="rating-text-cart">{menuItem.rating}</span>
            <span className="starForProduct-cart">★</span>
            </span>
            <span className="pounds-cart">  <b>{item.pounds} Pounds</b></span>

        </div>
        <div>
            <p className="message-heading">Added messages </p>
            <p className="message-text">{message? message : "No messages..."}</p>
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








  // const handleIncreasePounds = () => {
  //   setPounds(pounds + 1);
   
  // };
  // const handleDecreasePounds = () => {
  //   if (pounds > 1) {
  //     setPounds(pounds - 1);
      
  //   }
  // };


  //  {/* <div>
  //         <span className="pounds-cart">
  //         <div className="pounds-text-cart">
          
  //         </div> */}
  //         {/* <div className="pound-options-cart">
  //         <button onClick={handleIncreasePounds}>+</button>
  //           <button onClick={handleDecreasePounds}>-</button>
  //         </div> */}       
  //       {/* <textarea
  //         className="message-cart"
  //         placeholder="Add a Message..."
  //         value={message}
  //         onChange={(e) => setMessage(e.target.value)}
  //       /> */}
  //       {/* </div> */}