import React from "react";

const RatingStars = ({ rating }) => {
  return (
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        // Inside the star rating system
        <span key={star} className="review-star">
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
