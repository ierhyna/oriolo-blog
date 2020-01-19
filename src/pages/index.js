import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Date from '../components/Date'

import Layout from '../components/Layout'

export default function IndexPage ({
  data
}) {
  const {
    blog,
    content
  } = data

  return (
    <Layout>
      <section>
        <h1>
          Последние заметки{' '}
          <small>
            (<Link to={'/blog'}>читать все</Link>)
          </small>
        </h1>

        <ul style={{ listStyleType: 'none', marginLeft: 0 }}>
          {blog.edges.map(({ node }) => (
            <li key={node.fields.slug}>
              <Date dateString={node.frontmatter.date} format={'L'} /> —&nbsp;
              <Link to={`${node.frontmatter.path}`} style={{ textDecoration: 'none' }}>
                {node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section  dangerouslySetInnerHTML={{ __html: content.html }} />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            path: PropTypes.string,
            date: PropTypes.string,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
    content: PropTypes.shape({
      html: PropTypes.string,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }, 
      filter: { fields: { collection: { eq: "blog" } } },
      limit: 5,
    ) {
      edges {
        node {
          id
          frontmatter {
            date
            path
            title
          }
          fields {
            slug
          }
        }
      }
    }
    content: markdownRemark(
      fields: { slug: { eq: "main" } }
    ) {
      html
    }
  }
`
