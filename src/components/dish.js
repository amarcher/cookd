import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Ingredient from './Ingredient';

const GET_DISH = gql`
  query GetDish($dishId: bigint!) {
    dish(where: {id: {_eq: $dishId}}) {
      id
      image_url
      name
      rating
      recipe_url
      dish_ingredients {
        ingredient {
          icon_url
          id
          name
        }
      }
    }
  }
`;

const Dish = ({ dishId }) => {
  const { loading, error, data } = useQuery(GET_DISH, { variables: { dishId: '1' } })

  if (loading) return "loading...";
  if (error) return `error: ${error.message}`
  const dish = data?.dish?.length ? data.dish[0] : undefined

  if (!dish) {
    return 'Dish not found'
  }

  return (
    <div>
      <h2>{dish.name}</h2>
      <video src={dish.image_url} controls autoplay="autoplay" loop />
      {dish.dish_ingredients.map((dish_ingredient, index) => {
        return (<Ingredient {...dish_ingredient.ingredient} />
        );
      })}
    </div>
  );
};

export default Dish;
export { GET_DISH };
