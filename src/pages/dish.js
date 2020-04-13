import React from 'react';
import { Link } from 'gatsby'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Ingredient from '../components/ingredient';

import './dish.css';

export const GET_DISH = gql`
  query GetDish($dishId: bigint!) {
    dish(where: { id: { _eq: $dishId } }) {
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
      chef {
        name
      }
    }
  }
`;

const Dish = ({ dishId }) => {
  const { loading, error, data } = useQuery(GET_DISH, {
    variables: { dishId },
  });

  if (loading) return 'loading...';
  if (error) return `error: ${error.message}`;
  const dish = data?.dish?.length ? data.dish[0] : undefined;

  if (!dish) {
    navigate('/404');
    return null;
  }

  const { chef: { name: chefName }, name: dishName, dish_ingredients } = dish;

  return (
    <Layout>
      <SEO title={`${dishName} by ${chefName}`} />
      <h2>{dishName}</h2>
      <video src={dish.image_url} controls autoPlay loop />
      {dish_ingredients.map((dish_ingredient, index) => {
        return <Ingredient {...dish_ingredient.ingredient} key={index} />;
      })}
    </Layout>
  );
};

export default () => (
  <Router>
    <Dish path="dish/:dishId" />
  </Router>
);
