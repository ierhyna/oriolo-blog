import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Date from '../components/Date'
import { DiscussionEmbed } from 'disqus-react'

class PostTemplate extends Component {
  render () {
    const { wordpressPost: post } = this.props.data

    return (
      <Layout>
        <h1>{post.title}</h1>
        <Date dateString={post.date} format={'L'} />

        <div style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: post.content }} />
        
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
  data: PropTypes.shape({
    wordpressPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PostTemplate

export const query = graphql`
  query PostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      slug
      date
      content
      categories {
        name
        slug
      }
      series {
        name
        slug
      }
    }
  }
`
