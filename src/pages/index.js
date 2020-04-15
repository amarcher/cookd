import React from "react"
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Layout from "../components/layout"
import SEO from "../components/seo"
import DishPreview from '../components/dishPreview';

import Loading from "../components/loading";

export const GET_RECENT_DISHES = gql`
  query GetRecentDishes {
    dish {
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

const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_RECENT_DISHES);

  if (loading) return <Loading />;
  if (error) return `error: ${error.message}`;

  const { dish: dishes } = data || {};

  if (!dishes?.length) return null;

  return (
    <Layout>
      <SEO title="Home" />
      {dishes.map((dish) => (
        <DishPreview {...dish} key={dish.id} />
      ))}
    </Layout>
  );
}

export default IndexPage
