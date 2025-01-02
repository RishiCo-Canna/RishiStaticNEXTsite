module.exports = {
  siteMetadata: {
    title: 'Cannabis Industry Website',
    description: 'A modern website for the cannabis industry built with Gatsby',
    author: 'Your Name',
    siteUrl: `https://${process.env.REPLIT_SLUG}.${process.env.REPLIT_ENVIRONMENT_DOMAIN || 'repl.co'}`,
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
  ],
}