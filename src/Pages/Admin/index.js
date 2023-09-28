// Admin.js
import React, { useState } from "react";
import { db } from "../../firebase";
import "./styles.css";
import { collection, addDoc } from "firebase/firestore";

export default function Admin() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [others, setOthers] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the product to the "products" collection in Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name: productName,
        category: category,
        details: details,
        price: parseFloat(price),
        others: others,
        image: image,
      });

      // Clear the input fields after adding the product
      setProductName("");
      setCategory("");
      setDetails("");
      setPrice("");
      setOthers("");
      setImage("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="form-product">
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="others">Others:</label>
          <input
            type="text"
            id="others"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
