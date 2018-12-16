import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Date from '../components/Date'

import Layout from '../components/Layout'

class IndexPage extends Component {
  render () {
    const {
      allWordpressPost: posts,
      allMarkdownRemark: projects
    } = this.props.data

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
            {posts.edges.map(({ node }) => (
              <li key={node.slug}>
                <Date dateString={node.date} format={'L'} /> —&nbsp;
                <Link to={`${node.slug}`} style={{ textDecoration: 'none' }}>
                  {node.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h1>Opensource-проекты</h1>

          <ul>
            {projects.edges.map(({ node }) => (
              <li key={node.frontmatter.title}>
                {node.frontmatter.prefix} «
                <a
                  href={`${node.frontmatter.link}`}
                  style={{ textDecoration: 'none' }}
                >
                  {node.frontmatter.title}
                </a>
                » — {node.frontmatter.description}
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          title: PropTypes.string,
          slug: PropTypes.string,
          date: PropTypes.date,
        }).isRequired,
      })).isRequired,
    }).isRequired,
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            prefix: PropTypes.string,
            link: PropTypes.string,
            icon: PropTypes.string,
            description: PropTypes.string,
          }).isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    allWordpressPost(sort: { fields: [date], order: DESC }, limit: 5) {
      edges {
        node {
          title
          slug
          date
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      edges {
        node {
          frontmatter {
            title
            prefix
            link
            icon
            description
          }
        }
      }
    }
  }
`
