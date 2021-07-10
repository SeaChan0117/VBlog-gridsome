<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{title(curBlog.files)}}</span>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right;">
              <el-button @click="$share()" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
              <g-link to="/blogs">
                <el-button style=" padding: 3px 0" type="text" icon="el-icon-more-outline">更多博客</el-button>
              </g-link>

            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
        发布 {{curBlog.created_at | date}}
        <br> 更新 {{curBlog.updated_at | date}}
      </div>
      <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0">
        <pre style="font-family: '微软雅黑';white-space: break-spaces">{{curBlog.description}}</pre>
      </div>
      <div v-html="md2html(curBlog.content)" class="markdown-body" style="padding-top: 20px"></div>
    </el-card>
  </Layout>
</template>

<page-query>
query($id: ID!){
allBlogs(filter:{id:{in: [$id]}}) {
edges{
node{
blog
}
}
}
}
</page-query>

<script>
import axios from 'axios'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
export default {
  name: "BlogDetail",
  data() {
    return {
      curBlog: {}
    }
  },
  methods:{
    title(files) {
      let title = ''
      for (const filesKey in files) {
        title = filesKey
        break
      }
      return title
    },
    md2html(markdown) {
      return md.render(markdown || '')
    }
  },
  async created() {
    this.curBlog = JSON.parse(this.$page.allBlogs.edges[0].node.blog) || {}
    const { data } = await axios.get(`https://api.github.com/gists/${this.$route.params.id}`)
    this.$set(this.curBlog, 'content', data.files[this.title(this.curBlog.files)].content)
  }
}
</script>

<style scoped>

</style>
