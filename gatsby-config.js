module.exports = {
  siteMetadata: {
    title: 'Cannabis Industry Website',
    description: 'A static website for the cannabis industry built with Gatsby and Decap CMS',
    author: 'Your Name',
    siteUrl: `https://${process.env.REPLIT_SLUG}.${process.env.REPLIT_ENVIRONMENT_DOMAIN || 'repl.co'}`,
  },
  plugins: [
    'gatsby-plugin-decap-cms',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-transformer-remark',
  ],
}