import React, { useEffect } from "react";
import "./styles.css";

const CartProductCard = ({ product, removeProduct, updateTotalpPrice }) => {
  const totalpPrice = product.price * product.quantity;

  const handleRemove = () => {
    removeProduct(product);
  };

  useEffect(() => {
    updateTotalpPrice(totalpPrice);
  }, [totalpPrice]);

  return (
    <div className="cart-p-card">
      <div className="cart-p-img">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="cart-p-content">
        <h3>{product.name}</h3>
        <div className="cart-p-quantity">{product.quantity} Pcs</div>
        <div className="cart-p-rate">
          <button onClick={handleRemove}>Remove</button>
          <span>
            <h3>₹{product.quantity * product.price}</h3>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
