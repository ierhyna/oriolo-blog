module.exports = {
  siteMetadata: {
    title: 'Ирина Соколовская',
    menuLinks: [
      {
        name: 'Блог',
        link: '/blog',
      },
      {
        name: 'Обо мне',
        link: '/about',
      },
      {
        name: 'Контакты',
        link: '/contacts',
      },
    ],
    siteUrl: 'https://oriolo.ru',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/content/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 920,
              quality: 90,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          }
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Ирина Соколовская',
        short_name: 'Ирина Соколовская',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#dc6005',
        display: 'minimal-ui',
        icon: 'src/images/icon-192x192.png',
      },
    },
    // this plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
