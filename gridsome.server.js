// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')
module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const recentCollection = addCollection('Recent')
    const res1 = await axios.get('https://api.github.com/users/GitHub-Laziji/gists?page=1&per_page=1')
    const recent = {
      id: res1.data[0].id
    }
    const recentId = res1.data[0].id
    const res2 = await axios.get('https://api.github.com/gists/' + recentId)
    for (let key in res2.data.files) {
      recent['title'] = key
      recent['content'] = res2.data.files[key]['content']
      recent['description'] = res1.data[0]['description']
      recent['createTime'] = res1.data[0]['created_at']
      recent['updateTime'] = res1.data[0]['updated_at']
      break
    }
    recentCollection.addNode(recent)


  })

  api.loadSource(async ({ addCollection }) => {
    const blogsCollection = addCollection('Blogs')
    const res1 = await axios.get('https://api.github.com/users/GitHub-Laziji/gists')
    for (const item of res1.data) {
      blogsCollection.addNode({
        id: item.id,
        blog: JSON.stringify(item)
      })
    }
  })


  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
