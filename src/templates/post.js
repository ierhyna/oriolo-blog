import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Date from '../components/Date'
import { DiscussionEmbed } from 'disqus-react'

export default function PostTemplate ({
  data
}) {
  const { markdownRemark } = data
  const { html, frontmatter, fields } = markdownRemark

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <Date dateString={frontmatter.date} format={'L'} />

      <div style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: html }} />

      <DiscussionEmbed
        shortname={'oriolo'}
        config={{
          url: `https://oriolo.ru/${frontmatter.path}`,
          identifier: fields.slug,
          title: frontmatter.title,
        }}
      />
    </Layout>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        path
        date
      }
      fields {
        slug
      }
    }
  }
`
