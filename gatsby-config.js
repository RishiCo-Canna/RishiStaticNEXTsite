module.exports = {
  siteMetadata: {
    title: 'Cannabis Industry Website',
    description: 'A static website for the cannabis industry',
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