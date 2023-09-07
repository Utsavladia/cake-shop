import React, { useState } from "react";
import "./styles.css"; // Import your external CSS file
import CakeModal from "../CakeModel"; // Import your CakeModal component

const ListItem = ({ searchQuery, filteredItems }) => {
  const filteredAndSearchedItems = filteredItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flavour.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.occasion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedCake, setSelectedCake] = useState(null);

  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
  };

  const handleModalClose = () => {
    setSelectedCake(null);
  };

  return (
    <div className="cake-list">
      {filteredAndSearchedItems.map((item, index) => (
        <div
          key={index}
          className="cake-card"
          onClick={() => handleCakeClick(item)}
        >
          <img src={item.image} alt="CakeImage" />
          <div className="cake-details">
            <h2>{item.name}</h2>
            <p className="flavour-pounds">
              <span>{item.flavour}</span>
              <span>{item.pounds} pounds</span>
            </p>
            <header>
              <div className="price-box">
                <span className="rupee-sign">₹</span>
                <span className="price">{item.price * item.pounds}</span>
              </div>

              <div className="rating-box">
                <span className="rating-text">{item.rating}</span>
                <span className="starForProduct">★</span>
              </div>
            </header>
          </div>
        </div>
      ))}

      {selectedCake && (
        <CakeModal
          cake={selectedCake}
          onClose={handleModalClose}
          onAddToCart={(cake) => {
            // Implement your logic to add the cake to the cart here
          }}
        />
      )}
    </div>
  );
};

export default ListItem;
