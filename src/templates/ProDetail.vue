<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{pro.name}}</span>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right;">
              <el-button @click="$share()" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
              <el-button @click="goGithub(pro.html_url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
              <el-button @click="more" style="padding: 3px 0" type="text" icon="el-icon-more-outline">更多项目</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
        发布 {{pro.created_at | date}}
        <br> 更新 {{pro.updated_at | date}}
      </div>
      <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 20px 0 0 0">
        {{pro.description}}
      </div>
      <div style="font-size: 1.1rem;color: #303133;padding: 15px 0;border-bottom: 1px solid #E4E7ED;">
        <el-row>
          <el-col :span="16"  style="padding-top: 5px">
            <el-tooltip effect="dark" :content="'star '+pro.stargazers_count" placement="bottom">
              <i class="el-icon-star-off" style="margin: 0 5px 0 0"></i>
            </el-tooltip>
            {{pro.stargazers_count}}
            <el-tooltip effect="dark" :content="'watch '+pro.watchers_count" placement="bottom">
              <i class="el-icon-view" style="margin: 0 5px 0 15px"></i>
            </el-tooltip>
            {{pro.watchers_count}}
            <el-tooltip effect="dark" :content="'fork '+pro.forks_count" placement="bottom">
              <i class="el-icon-bell" style="margin: 0 5px 0 15px"></i>
            </el-tooltip>
            {{pro.forks_count}}
          </el-col>
          <el-col :span="8" style="text-align: right">
            <el-tag size="small" type="danger" v-if="pro.license" style="margin-right: 5px">{{pro['license']['spdx_id']}}</el-tag>
            <el-tag size="small" type="success">{{pro.language}}</el-tag>
          </el-col>

        </el-row>

      </div>
      <div v-html="md2html(pro.readme_content)" v-if="pro.readme_content" class="markdown-body" style="padding-top: 20px"></div>
      <div v-if="!pro.readme_content" style="padding: 20px 0;text-align: center">
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </div>
    </el-card>
  </Layout>
</template>

<page-query>
query($id: ID!){
project(id: $id){
name
}

allUser{
edges{
node{
login
}
}
}
}
</page-query>

<script>
import axios from "axios"
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: "ProDetail",
  data() {
    return {
      pro: {}
    }
  },
  methods: {
    async initProDetail() {
      let base64 = require('js-base64').Base64
      const {data} = await axios.get(`https://api.github.com/repos/${this.$page.allUser.edges[0].node.login}/${this.$page.project.name}`)
      this.pro = data
      const readmeData = await axios.get(`https://api.github.com/repos/${this.$page.allUser.edges[0].node.login}/${this.$page.project.name}/contents/README.md`)
      this.$set(this.pro, 'readme_content', base64.decode(readmeData.data.content))
    },
    md2html(markdown) {
      return md.render(markdown || '')
    },
    goGithub (url) {
      window.open(url)
    },
    more() {
      this.$router.push('/projects')
    }
  },
  created() {
    this.initProDetail()
  }
}
</script>

<style scoped>

</style>
