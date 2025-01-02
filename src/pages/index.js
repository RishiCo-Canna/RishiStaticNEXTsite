import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const query = graphql`
  query HomePageQuery {
    markdownRemark(fileAbsolutePath: {regex: "/index.md/"}) {
      frontmatter {
        title
        content
      }
    }
  }
`

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark || { frontmatter: { title: 'Welcome', content: 'Loading...' } }

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.content}</p>
      <div>
        <a href="/admin/" style={{ 
          display: 'inline-block',
          padding: '0.5rem 1rem',
          background: '#007acc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Edit Content
        </a>
      </div>
    </Layout>
  )
}

export default IndexPage