<template>
  <Layout>
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
      <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
      <el-button @click="$share()" icon="el-icon-share" type="warning" style="margin-left: 10px" plain
                 circle></el-button>
    </el-card>

    <div v-if="projects&&projects.length>0">
      <el-card shadow="hover" v-for="(item,index) in projects" :key="'pro'+index" style="margin-bottom: 20px"
               v-if="!item.hide">
        <div slot="header">
          <el-row>
            <el-col :span="16">
                            <span>
                                <g-link style="text-decoration:none;cursor:pointer" :to="'/project/' + item.id">
                                    <i class="el-icon-service"></i>&nbsp;&nbsp; {{ item.name }}
                                </g-link>
                            </span>
            </el-col>
            <el-col :span="8">
              <div style="text-align: right;">
                <el-button @click="goGithub(item.html_url)" style="padding: 3px 0" type="text" icon="el-icon-back">
                  前往GitHub
                </el-button>
                <el-button @click="$share('/project/'+item.id)" style="padding: 3px 0" type="text"
                           icon="el-icon-share"></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          最近更新 {{ item.updated_at  | date }}
        </div>
        <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0 0 0">
          {{ item.description }}
        </div>
        <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip effect="dark" :content="'star '+item.stargazers_count" placement="bottom">
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ item.stargazers_count }}
              <el-tooltip effect="dark" :content="'watch '+item.watchers_count" placement="bottom">
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ item.watchers_count }}
              <el-tooltip effect="dark" :content="'fork '+item.forks_count" placement="bottom">
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ item.forks_count }}
            </el-col>
            <el-col :span="8" style="text-align: right;">
              <el-tag size="small" type="danger" v-if="item.license">{{ item['license']['spdx_id'] }}</el-tag>
              <el-tag size="small" type="success" v-if="item.language">{{ item.language }}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <!--    pagination-->
      <div style="text-align: center">
        <Pager :info="$page.allProject.pageInfo"/>
      </div>
    </div>

    <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0;text-align: center"
             v-if="!projects || projects.length===0">
      <font style="font-size: 30px;color:#dddddd ">
        <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </Layout>
</template>

<page-query>
query($page: Int){
allProject(perPage:5,page:$page) @paginate{
pageInfo {
totalPages
currentPage
}

edges{
node{
id
name
html_url
description
updated_at
stargazers_count
watchers_count
forks_count
language
}
}
}
}
</page-query>

<script>
import {Pager} from 'gridsome'

export default {
  components: {
    Pager
  },
  name: "Project",
  data() {
    return {
      searchKey: ''
    }
  },
  methods: {
    search() {
    },
    goDetails(name) {

    },
    goGithub(url) {
      window.open(url)
    }
  },
  computed: {
    projects() {
      return this.$page.allProject.edges.map(item => item.node)
    }
  }
}
</script>

<style scoped>

</style>
