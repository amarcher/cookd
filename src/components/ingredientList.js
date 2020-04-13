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

const AuthorList = () => {
  const { loading, error, data } = useQuery(GET_INGREDIENTS);

  if (loading) return "loading...";
  if (error) return `error: ${error.message}`;

  return (
    <div>
      {data.ingredient.map((ingredient, index) => (
        <Ingredient {...ingredient} />
      ))}
    </div>
  );
};

export default AuthorList;
export { GET_INGREDIENTS };
