import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogPosts from '../components/Blog'

export default function BlogTemplate ({
  data, pageContext
}) {
  const { currentPage, numPages } = pageContext
  const { blog } = data
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`
  const nextPage = `/blog/${(currentPage + 1).toString()}`

  return (
    <Layout>
      <BlogPosts blog={blog} />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ←
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            style={{
              margin: 0,
            }}
          >
            <Link
              to={`/blog/${i === 0 ? '' : i + 1}`}
              style={{
                textDecoration: 'none',
                color: i + 1 === currentPage ? '#ffffff' : '',
                background: i + 1 === currentPage ? '#007acc' : '',
              }}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        {!isLast && (
          <Link to={nextPage} rel="next">
            →
          </Link>
        )}
      </ul>
    </Layout>
  )
}

BlogTemplate.propTypes = {
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    blog: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          title: PropTypes.string,
          slug: PropTypes.string,
          date: PropTypes.date,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query BlogPageQuery($skip: Int!, $limit: Int!) {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }, 
      filter: { fields: { collection: { eq: "blog" } } },
      limit: $limit,
      skip: $skip,
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            title
            category
            series
            tags
            excerpt
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
