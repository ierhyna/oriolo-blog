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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typography',
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
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'oriolo.ru',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false,
      },
    },
    // this plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
  mapping: {
    'wordpress__POST.series': 'wordpress__wp_series.wordpress_id',
  },
}
