import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { GET_INGREDIENTS } from "./ingredientList";

const ADD_AUTHOR = gql`
  mutation insert_ingredient($name: String!, $iconUrl: String!) {
    insert_ingredient(objects: { name: $name, icon_url: $iconUrl }) {
      returning {
        id
        name
        icon_url
      }
    }
  }
`;

const AddIngredient = () => {
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [insert_ingredient, { loading, error }] = useMutation(ADD_AUTHOR, {
    update: (cache, { data }) => {
      setName('');
      setIconUrl('');
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

  if (loading) return null;
  if (error) return `error: ${error.message}`;

  const handleSubmit = event => {
    event.preventDefault();
    insert_ingredient({
      variables: {
        name,
        iconUrl,
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Ingredient:</h2>
      <div>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="icon_url">
          Icon URL
          <input
            name="icon_url"
            value={iconUrl}
            onChange={event => setIconUrl(event.target.value)}
          />
        </label>
      </div>
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddIngredient;
