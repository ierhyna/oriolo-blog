import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

class BlogPosts extends Component {
  render () {
    const { posts } = this.props
    return posts.map(({ node: post }) => (
      <div key={post.slug}>
        <Link to={`${post.slug}`} style={{ textDecoration: 'none' }}>
          <h3>{post.title}</h3>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      </div>
    ))
  }
}

BlogPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  })).isRequired,
}
export default BlogPosts
