<template>
<Layout>
  <div v-if="blogs&&blogs.length>0">
    <el-card shadow="hover" v-for="(item,index) in blogs" :key="'p'+index" style="margin-bottom: 20px" v-if="!item.hide">
      <div slot="header">
        <el-row>
          <el-col :span="16">
                            <span>
                                <g-link style="text-decoration:none;cursor:pointer" :to="'/blog-detail/' + item.id">
                                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{title(item.files)}}
                                </g-link>
                            </span>
          </el-col>
          <el-col :span="8">
            <div style="text-align: right;">
              <el-button @click="$share('/user/blog/details/'+item.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
              <el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"></el-button>
              <el-button @click="deleteBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
        最近更新 {{item.updated_at | date}}
      </div>
      <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0 0 0">
        {{item.description}}
      </div>
    </el-card>
    <div style="text-align: center">
<!--      <el-pagination @current-change="list" background layout="prev, pager, next" :current-page.sync="query.page" :page-size="query.pageSize"-->
<!--                     :total="query.pageNumber*query.pageSize">-->
<!--      </el-pagination>-->
      <Pager :info="$page.allBlogs.pageInfo"/>
    </div>

  </div>

  <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0 20px 0;text-align: center" v-if="!blogs||blogs.length===0">
    <font style="font-size: 30px;color:#dddddd ">
      <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
    </font>
  </el-card>
</Layout>
</template>

<page-query>
query($page: Int){
allBlogs(perPage:5,page:$page) @paginate{
pageInfo {
totalPages
currentPage
}
edges{
node{
blog
}
}
}
}
</page-query>

<script>
import { Pager } from 'gridsome'
export default {
  name: "Blogs",
  components: {
    Pager
  },
  data() {
    return {
      query: {
        page: 1,
        pageSize: 5,
        pageNumber: 1
      },
      // blogs: [],
      token: ''
    }
  },
  methods: {
    goDetails(blogId) {
      console.log(blogId)
    },
    list() {},
    editBlog(idx) {},
    deleteBlog(idx) {},
    title(files) {
      let title = ''
      for (const filesKey in files) {
        title = filesKey
        break
      }
      return title
    }
  },
  computed: {
    blogs() {
      return this.$page.allBlogs.edges.map(item => JSON.parse(item.node.blog))
    }
  }
}
</script>

<style scoped>

</style>
