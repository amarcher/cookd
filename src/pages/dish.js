import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';

import Loading from '../components/loading';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Ingredient from '../components/ingredient';
import DishImage from '../components/dishImage';

import './dish.css';

export const GET_DISH = gql`
  query GetDish($dishId: bigint!) {
    dish(where: { id: { _eq: $dishId } }) {
      id
      image_url
      video_url
      poster_url
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

  if (loading) return <Loading />;
  if (error) return `error: ${error.message}`;

  const dish = data?.dish?.length ? data.dish[0] : null;

  if (!dish) {
    navigate('/404');
    return null;
  }

  const {
    chef: { name: chefName },
    name: dishName,
    dish_ingredients: dishIngredients,
    video_url: videoUrl,
    image_url: imageUrl,
    poster_url: posterUrl,
  } = dish;

  return (
    <Layout>
      <SEO title={`${dishName} by ${chefName}`} />
      <h2>{dishName}</h2>
      <h4>by {chefName}</h4>
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
    </Layout>
  );
};

export default () => (
  <Router>
    <Dish path="dish/:dishId" />
  </Router>
);
