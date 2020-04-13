import React from "react";

const Ingredient = ({ name, icon_url }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={icon_url} style={{ maxHeight: 40, maxWidth: 40 }} />
      <div>{name}</div>
    </div>
  );
};

export default Ingredient;
