import React from 'react';
import { Link } from 'gatsby';

import Ingredient from './ingredient';
import DishImage from './dishImage';

import './dishPreview.css';

const DishPreview = ({
    id: dishId,
    chef: { name: chefName },
    name: dishName,
    dish_ingredients: dishIngredients,
    video_url: videoUrl,
    image_url: imageUrl,
    poster_url: posterUrl,
  }) => (
  <Link to={`/dish/${dishId}`}>
    <div>
      <h5>{dishName} by {chefName}</h5>
      <div className="grid">
        <div className="col-fixed">
          <DishImage
            dishName={dishName}
            videoUrl={videoUrl}
            imageUrl={imageUrl}
            posterUrl={posterUrl}
          />
        </div>
        <div className="col">
          <div className="dish--ingredients">
            {dishIngredients.map(({ ingredient }) => {
              return <Ingredient {...ingredient} key={ingredient.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default DishPreview;