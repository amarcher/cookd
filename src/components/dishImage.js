import React from "react";

import './dishImage.css';

const DishImage = ({ dishName, imageUrl, videoUrl, posterUrl }) => {
  return (
    <div className="dish-image--container">
      {!!videoUrl ? (
        <div className="dish-image--video-container">
          <video
            alt={dishName}
            src={videoUrl}
            type="video/mp4"
            poster={posterUrl}
            preload="none"
            height="100%"
            width="100%"
            autoPlay="autoplay"
            playsInline
            loop
          />
        </div>
      ) : (
        <img src={imageUrl} alt={dishName} />
      )}
    </div>
  );
};

export default DishImage;
