import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Date from '../components/date'

import Layout from '../components/layout'

class IndexPage extends Component {
  render() {
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
            {this.props.data.allWordpressPost.edges.map(({ node }) => (
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
            {this.props.data.allMarkdownRemark.edges.map(({ node }) => (
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

IndexPage.proptypes = {
  data: {
    allWordpressPost: {
      edges: {
        node: {
          title: PropTypes.string,
          slug: PropTypes.string,
          date: PropTypes.date,
        },
      },
    },
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            title: PropTypes.string,
            prefix: PropTypes.string,
            link: PropTypes.string,
            icon: PropTypes.string,
            description: PropTypes.string,
          },
        },
      },
    },
  },
}

export default IndexPage

export const pageQuery = graphql`
  query {
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
