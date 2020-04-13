import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AddIngredient from "../components/addIngredient";
import IngredientList from "../components/ingredientList";
import Dish from "../components/dish";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <AddIngredient />
    <IngredientList />
    <Dish />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
