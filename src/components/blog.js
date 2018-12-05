import React, { Component } from 'react'
import { Link } from 'gatsby'

class BlogPosts extends Component {
  render() {
    const { posts } = this.props
    return posts.map(({ node }) => (
      <div key={node.slug}>
        <Link to={`${node.slug}`} css={{ textDecoration: 'none' }}>
          <h3>{node.title}</h3>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </div>
    ))
  }
}

export default BlogPosts
