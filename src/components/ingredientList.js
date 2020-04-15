import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Ingredient from "./ingredient";

const GET_INGREDIENTS = gql`
  query {
    ingredient {
      id
      name
      icon_url
    }
  }
`;

const IngredientList = () => {
  const { loading, error, data } = useQuery(GET_INGREDIENTS);

  if (loading) return null;
  if (error) return `error: ${error.message}`;

  return (
    <div>
      {data.ingredient.map((ingredient) => (
        <Ingredient {...ingredient} key={ingredient.id} />
      ))}
    </div>
  );
};

export default IngredientList;
export { GET_INGREDIENTS };
