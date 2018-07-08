module.exports = {
    title: 'Nodea E-Identification',
    description: "Nodea E-Identification is developed for Finnish trust network",
    themeConfig:{
        nav: [
            { text: 'GUIDE', link: '/guide/' },
        ],
        sidebar: [
            {
              title: 'API Guide',
              collapsable: false,
              children: [
                  '/guide/guide',
                  '/guide/api'
              ]
            }
          ]
    }
}
