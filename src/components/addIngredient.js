import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { GET_INGREDIENTS } from "./ingredientList";

const ADD_AUTHOR = gql`
  mutation insert_ingredient($name: String!) {
    insert_ingredient(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

const AddIngredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [insert_ingredient, { loading, error }] = useMutation(ADD_AUTHOR, {
    update: (cache, { data }) => {
      setIngredient("");
      const existingIngredients = cache.readQuery({
        query: GET_INGREDIENTS
      });

      // Add the new ingredient to the cache
      const newIngredient = data.insert_ingredient.returning[0];
      cache.writeQuery({
        query: GET_INGREDIENTS,
        data: { ingredient: [newIngredient, ...existingIngredients.ingredient] }
      });
    }
  });

  if (loading) return "loading...";
  if (error) return `error: ${error.message}`;

  const handleSubmit = event => {
    event.preventDefault();
    insert_ingredient({
      variables: {
        name: ingredient
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ingredient">
        Add Ingredient:
        <input
          name="ingredient"
          value={ingredient}
          onChange={event => setIngredient(event.target.value)}
        />
      </label>
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddIngredient;
