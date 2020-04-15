import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AddIngredient from "../components/addIngredient";
import IngredientList from "../components/ingredientList";
import Loading from "../components/loading";

const Ingredients = ({ loading }) => {
  if (loading) return <Loading />;
  
  return (
    <Layout>
      <SEO title="Home" />
      <AddIngredient />
      <IngredientList />
    </Layout>
  );
}

export default Ingredients
