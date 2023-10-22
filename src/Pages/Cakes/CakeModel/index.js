import React, { useEffect, useState } from "react";
import "./styles.css";
import { auth, db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const CakeModal = ({ cake, onClose }) => {
  const [pounds, setPounds] = useState(1);
  const [message, setMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const history = useHistory();

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

  const handleAddToCart = async () => {
    if (!auth.currentUser) {
      // Check if the user is authenticated
      console.log(
        "User is not logged in. Please log in to add items to the cart."
      );
      history.push("/login");
      return;
    }
    const cartItem = {
      cakeId: cake.id, // Assuming you have an 'id' property in your cake object
      pounds,
      message,
    };
    const userId = auth.currentUser.uid;

    try {
      if (!addedToCart) {
        await addDoc(collection(db, "cart" + userId), cartItem).then(() => {
          console.log("added to cart");
          setAddedToCart(true);
        });
      } else {
        history.push("/cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cartbuttontext = addedToCart ? "Go to cart" : "Add to cart";

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
          <br></br>
          <button
            className={
              addedToCart ? "add-cart-button clicked" : "add-cart-button"
            }
            onClick={handleAddToCart}
          >
            {cartbuttontext}
          </button>
        </header>
      </div>
    </div>
  );
};

export default CakeModal;

// const cakeWithDetails = {
//   ...cake,            // Copy the original cake details
//   pounds,             // Add selected pounds
//   message,            // Add the user's message
// };
// addToCart(cakeWithDetails);
