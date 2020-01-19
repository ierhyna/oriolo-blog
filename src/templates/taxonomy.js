import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'

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
  data: PropTypes.shape({
    wordpressCategory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PageTemplate

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
//   query TaxonomyQuery($id: String!) {
//     wordpressCategory(id: { eq: $id }) {
//       name
//     }
//   }
// `
