const path = require('path')
const slash = require('slash')

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const getPages = new Promise((resolve, reject) => {
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      // Create Page pages.
      const pageTemplate = path.resolve('./src/templates/page.js')
      // We want to create a detailed page for each
      // page node. We'll just use the Wordpress Slug for the slug.
      // The Page ID is prefixed with 'PAGE_'
      result.data.allWordpressPage.edges.forEach(edge => {
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: edge.node.slug,
          component: slash(pageTemplate),
          context: {
            id: edge.node.id,
          },
        })
      })
      resolve()
    })
  })

  const getPosts = new Promise((resolve, reject) => {
    graphql(
      `
        {
          allWordpressPost {
            edges {
              node {
                id
                slug
                status
                template
                format
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const postTemplate = path.resolve('./src/templates/post.js')
      // We want to create a detailed page for each
      // post node. We'll just use the Wordpress Slug for the slug.
      // The Post ID is prefixed with 'POST_'
      result.data.allWordpressPost.edges.forEach(edge => {
        createPage({
          path: edge.node.slug,
          component: slash(postTemplate),
          context: {
            id: edge.node.id,
          },
        })
      })
      resolve()
    })
  })

  return Promise.all([getPages, getPosts])
}
