import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const query = graphql`
  query HomePageQuery {
    markdownRemark(fields: { slug: { eq: "/" } }) {
      frontmatter {
        title
        content
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const { title, content } = data?.markdownRemark?.frontmatter || {
    title: 'Welcome to Our Cannabis Industry Website',
    content: 'This is a simple homepage that you can edit through Decap CMS.'
  }

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{content}</p>
    </Layout>
  )
}

export default IndexPage