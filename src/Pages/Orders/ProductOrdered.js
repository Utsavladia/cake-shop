import React from "react";
import "./styles.css";

const ProductOrdered = ({ product }) => {
  return (
    <div className="order-item-card">
      <img src={product.image} alt={product.name} />

      <header>
        <h3 className="item-name">{product.name}</h3>
        <div className="pounds-cart">
          <b>{product.quantity} Pcs</b>
        </div>
        <div className="cart-p-rate">
          <span className="price-box-cart">
            <span className="rupee-sign-cart">₹</span>
            <span className="price-cart">
              {product.quantity * product.price}
            </span>
          </span>
        </div>
      </header>
    </div>
  );
};

export default ProductOrdered;
