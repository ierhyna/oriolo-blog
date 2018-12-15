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
          <h1>Последние заметки</h1>

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
  }
`
