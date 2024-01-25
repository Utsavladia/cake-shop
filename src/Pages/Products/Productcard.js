import React, { useState, useEffect } from "react";
import "./styles.css"; // Replace with the actual CSS file for styling

const ProductCard = ({ product, onAddToCart }) => {
  const [q, setQ] = useState(product.quantity);

  useEffect(() => {
    // Update the quantity when the product quantity changes
    setQ(product.quantity);
  }, [product.quantity]);

  const startAddingToCart = () => {
    const newQuantity = 1;
    console.log("adding to cart started with add button ");
    onAddToCart(product, newQuantity);
    setQ(newQuantity);
  };

  const increaseQuantity = () => {
    setQ((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      onAddToCart(product, newQuantity);
      return newQuantity;
    });
    console.log("increase of quantity is callled");
  };

  const decreaseQuantity = () => {
    setQ((prevQuantity) => {
      const newQuantity = Math.max(0, prevQuantity - 1);
      onAddToCart(product, newQuantity);
      return newQuantity;
    });
    console.log("decrease quantity was called");
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p>{product.details}</p>
        <div className="product-price">
          <span className="product-rupee">₹{product.price}</span>
          {q > 0 ? (
            <div className="quantity-controls">
              <button className="plus-button left" onClick={decreaseQuantity}>
                -
              </button>
              <span>{q}</span>
              <button className="plus-button right" onClick={increaseQuantity}>
                +
              </button>
            </div>
          ) : (
            <button className="add-button" onClick={startAddingToCart}>
              Add +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
