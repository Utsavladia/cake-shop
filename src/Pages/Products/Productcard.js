import React from "react";

const Productcard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} />
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p>{product.details}</p>
        <div className="product-price">
          <span className="product-rupee">₹</span>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
