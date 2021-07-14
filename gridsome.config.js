// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'v-blog',
  plugins: [],
  templates: {
    Blogs: [
      {
        path: '/blogs/:id',
        component: './src/templates/BlogDetail.vue'
      }
    ],
    Project: [
      {
        path: '/project/:id',
        component: './src/templates/ProDetail.vue'
      }
    ]
  }
}
