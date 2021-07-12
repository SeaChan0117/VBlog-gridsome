// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')
module.exports = function (api) {
    api.loadSource(async ({addCollection}) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
        // 最新动态
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

        // 博客列表
        const blogsCollection = addCollection('Blogs')
        const blogsData = await axios.get('https://api.github.com/users/GitHub-Laziji/gists')
        for (const item of blogsData.data) {
            blogsCollection.addNode({
                id: item.id,
                blog: JSON.stringify(item)
            })
        }

        // 用户信息
        const userCollection = addCollection('User')
        const user = await axios.get('https://api.github.com/users/GitHub-Laziji')
        const userNode = Object.assign({}, user.data)
        userCollection.addNode(userNode)

        // 粉丝
        const followersCollection = addCollection('Followers')
        const pageTotal = Math.ceil(userNode.followers / 100)
        const allReq = []
        for (let i = 1; i <= pageTotal; i++) {
            allReq.push(axios.get(`https://api.github.com/users/GitHub-Laziji/followers?page=${i}&per_page=100`))
        }
        const followersData = await Promise.all(allReq)
        followersData.forEach(dataPrePage => {
            for (const item of dataPrePage.data) {
                const follower = Object.assign({}, item)
                followersCollection.addNode(follower)
            }
        })

        // 关注
        const followingCollection = addCollection('Following')
        const pageTotal1 = Math.ceil(userNode.following / 100)
        const allReq1 = []
        for (let i = 1; i <= pageTotal1; i++) {
            allReq1.push(axios.get(`https://api.github.com/users/GitHub-Laziji/following?page=${i}&per_page=100`))
        }
        const followingData = await Promise.all(allReq1)
        followingData.forEach(dataPrePage => {
            for (const item of dataPrePage.data) {
                const following = Object.assign({}, item)
                followingCollection.addNode(following)
            }
        })
    })

    api.createPages(({createPage}) => {
        // Use the Pages API here: https://gridsome.org/docs/pages-api/
    })
}
