const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Define our schema explicitly
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      html: String
    }

    type Frontmatter {
      title: String!
      date: Date @dateformat(formatString: "MMMM DD, YYYY")
      thumbnail: String
    }
  `
  createTypes(typeDefs)
}

// Create pages dynamically
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = node.frontmatter.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`,
    })
  }
}

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