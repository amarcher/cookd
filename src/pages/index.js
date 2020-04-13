import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AddIngredient from "../components/addIngredient";
import IngredientList from "../components/ingredientList";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <AddIngredient />
    <IngredientList />
    <Link to="/dish/1">Go to first dish</Link>
  </Layout>
)

export default IndexPage
