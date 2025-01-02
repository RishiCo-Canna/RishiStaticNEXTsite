import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const IndexPage = ({ data }) => {
  const { markdownRemark } = data || {}
  const { frontmatter } = markdownRemark || {}

  return (
    <Layout>
      <h1>{frontmatter?.title || 'Welcome to Our Cannabis Industry Website'}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark?.html || '<p>This is a simple homepage that you can edit through Decap CMS.</p>' }} />
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    markdownRemark(fileAbsolutePath: { regex: "/content/index.md/" }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default IndexPage