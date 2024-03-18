import React, { useState } from 'react';

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div className="stars-container">
      {[1, 2, 3, 4, 5].map((rating) => (
        <span
          key={rating}
          className={`star ${rating <= selectedRating ? 'active' : ''}`}
          onClick={() => handleRatingClick(rating)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
