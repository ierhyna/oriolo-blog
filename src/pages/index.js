import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogPosts from '../components/blog'

class IndexPage extends Component {
  render() {
    console.log(this.props)
    return (
      <Layout>
        <h1>Recent Blog Posts</h1>
        <BlogPosts posts={this.props.data.allWordpressPost.edges} />
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }, limit: 5) {
      edges {
        node {
          title
          excerpt
          slug
          date
        }
      }
    }
  }
`
