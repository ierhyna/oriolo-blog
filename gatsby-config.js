module.exports = {
  siteMetadata: {
    title: 'Blog',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: 'Blog',
    //     short_name: 'Blog',
    //     start_url: '/',
    //     background_color: '#979797',
    //     theme_color: '#663399',
    //     display: 'minimal-ui',
    //     icon: '', // This path is relative to the root of the site.
    //   },
    // },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'oriolo.ru',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
  mapping: {
    'wordpress__POST.series': 'wordpress__wp_series.wordpress_id',
  },
}
