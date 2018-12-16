import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'

class PageTemplate extends Component {
  render () {
    const { wordpressPage: page } = this.props.data

    return (
      <Layout>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </Layout>
    )
  }
}

PageTemplate.propTypes = {
  data: PropTypes.shape({
    wordpressPage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PageTemplate

export const query = graphql`
  query PageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`
