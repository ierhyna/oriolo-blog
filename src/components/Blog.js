import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export default function BlogPosts ({
  blog
}) {
  const { edges: posts } = blog
  return posts.map(({ node: post }) => (
    <div key={post.frontmatter.path}>
      <Link to={`${post.frontmatter.path}`} style={{ textDecoration: 'none' }}>
        <h3>{post.frontmatter.title}</h3>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: post.frontmatter.excerpt || post.excerpt }} />
    </div>
  ))
}

BlogPosts.propTypes = {
  blog: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        date: PropTypes.date,
      }).isRequired,
    })).isRequired,
  }).isRequired,
}
