const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Define our schema explicitly
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      html: String
    }

    type Frontmatter {
      title: String!
      date: Date @dateformat
      thumbnail: String
    }
  `
  createTypes(typeDefs)
}

// Create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `)

  // Create blog posts pages
  result.data?.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: node.fields?.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields?.slug,
      },
    })
  })
}
