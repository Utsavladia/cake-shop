import React, { useEffect, useState } from "react";
import "./styles.css";
import {auth, db} from "../../firebase"

const CakeModal = ({ cake, onClose }) => {
  const [pounds, setPounds] = useState(1);
  const [message, setMessage] = useState("");






  

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal")) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);
  const handleIncreasePounds = () => {
    // Increase pounds by 1 (you can adjust the step as needed)
    setPounds(pounds + 1);
  };

  const handleDecreasePounds = () => {
    // Ensure pounds doesn't go below 1
    if (pounds > 1) {
      setPounds(pounds - 1);
    }
  };
  // Calculate the updated price based on pounds
  const updatedPrice = cake.price * pounds;





  const handleAddToCart = ()=>{
    console.log("add to cart called")
    // const cakeWithDetails = {
    //   ...cake,            // Copy the original cake details
    //   pounds,             // Add selected pounds
    //   message,            // Add the user's message
    // };
    // addToCart(cakeWithDetails);
  }







  return (
    <div className="modal">
      <div className="modal-content">
        <img src={cake.image} alt="CakeImage" />
        <header>
          <h1>{cake.name}</h1>
          <div>
            <span>flavour: </span>
            {cake.flavour}
          </div>
          <div className="price-box">
            <span className="rupee-sign">₹</span>
            <span className="price">{updatedPrice}</span>
            <span className="rating-box">
              <span className="rating-text">{cake.rating}</span>
              <span className="starForProduct">★</span>
            </span>
          </div>

          <div>
            <div className="pounds-text">
              <b>{pounds} Pounds</b>
            </div>
            <div className="pound-options">
              <button onClick={handleDecreasePounds}>-</button>
              <button onClick={handleIncreasePounds}>+</button>
            </div>
          </div>

          <textarea
            className="message"
            placeholder="Add a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="add-cart-button" onClick={handleAddToCart}>
          add to cart
        </button>
        
        </header>
      </div>
    </div>
  );
};

export default CakeModal;
