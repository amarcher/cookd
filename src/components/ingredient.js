import React from "react";

import './ingredient.css';

const Ingredient = ({ name, icon_url }) => {
  return (
    <div className="ingredient__container">
      <div className="ingredient__icon_container">
        <img src={icon_url} className="ingredient__icon" alt={name} />
      </div>
      <div className="ingredient__name">{name}</div>
    </div>
  );
};

export default Ingredient;
