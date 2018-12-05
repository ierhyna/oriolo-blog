import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import { DiscussionEmbed } from 'disqus-react'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <Layout>
        <h1>{post.title}</h1>
        <span>{post.date}</span>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <DiscussionEmbed
          shortname={'oriolo'}
          config={{
            url: `https://oriolo.ru/${post.slug}`,
            identifier: post.slug,
            title: post.title,
          }}
        />
      </Layout>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      date
      categories {
        name
        slug
      }
      series {
        name
        slug
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
