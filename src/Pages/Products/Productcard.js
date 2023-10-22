import React, { useState } from "react";

const Productcard = ({ product, onAddToCart }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const startAddingToCart = () => {
    setIsAddingToCart(true);
    setQuantity(1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const confirmAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAddingToCart(false);
  };

  return (
    <div className="product-card" onClick={startAddingToCart}>
      <img src={product.image} alt={product.name} />
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p>{product.details}</p>
        <div className="product-price">
          <span className="product-rupee">₹{product.price}</span>

          {!isAddingToCart ? (
            <button className="add-button" onClick={startAddingToCart}>
              Add +
            </button>
          ) : (
            <div className="activity">
              <span className="quantity-controls">
                <button
                  className="plus-button"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="plus-button-q">{quantity}</span>
                <button
                  className="plus-button"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productcard;
