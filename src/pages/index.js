import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const { markdownRemark } = data || {}
  const { frontmatter, html } = markdownRemark || {}

  return (
    <Layout>
      <main>
        <h1>{frontmatter?.title || "Welcome to Cannabis Industry Website"}</h1>
        <div 
          dangerouslySetInnerHTML={{ 
            __html: html || "<p>Your trusted source for cannabis industry information and resources.</p>" 
          }} 
        />
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/content/index.md/" }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`