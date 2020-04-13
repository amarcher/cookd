import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_INGREDIENTS = gql`
  query {
    ingredient {
      id
      name
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
        <div key={index}>
          <h2>{ingredient.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default AuthorList;
export { GET_INGREDIENTS };
