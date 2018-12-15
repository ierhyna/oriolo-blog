import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'

class PageTemplate extends Component {
  render () {
    const category = this.props.data.wordpressCategory

    return (
      <Layout>
        <h1>{category.name}</h1>
      </Layout>
    )
  }
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressCategory(id: { eq: $id }) {
      name
    }
  }
`
