const path = require('path')
const slash = require('slash')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug.split('/').join(''),
    })

    const parent = getNode(node.parent)
    createNodeField({
      node,
      name: 'collection',
      value: parent.sourceInstanceName,
    })
  }
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              collection
            }
          }
        }
      }
    }
  `)

  // Create blog and posts
  const posts = data.allMarkdownRemark.edges.filter(edge => edge.node.fields.collection === 'blog')
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  posts.forEach(edge => {
    const slug = edge.node.fields.slug

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/post.js'),
      context: { slug: slug },
    })
  })

  // Create non-blog pages
  const pages = data.allMarkdownRemark.edges.filter(edge => edge.node.fields.collection === 'pages')

  pages.forEach(edge => {
    const slug = edge.node.fields.slug
    
    if (slug !== 'main') {
      actions.createPage({
        path: slug,
        component: require.resolve('./src/templates/page.js'),
        context: { slug: slug },
      })
    }
  })
}
