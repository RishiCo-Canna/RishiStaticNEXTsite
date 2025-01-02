import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <article className="blog-post">
        <h1>{frontmatter.title}</h1>
        {frontmatter.thumbnail && (
          <img src={frontmatter.thumbnail} alt={frontmatter.title} />
        )}
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        thumbnail
      }
    }
  }
`

export default BlogPostTemplate
