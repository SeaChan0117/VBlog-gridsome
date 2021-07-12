<template>
  <Layout>
    <SocialInfoList :socialInfoData="following"></SocialInfoList>

    <div style="text-align: center">
      <Pager :info="$page.allFollowing.pageInfo"/>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int){
allUser{
edges{
node{
id
followers
following
}
}
}


allFollowing(perPage:9,page:$page) @paginate{
pageInfo {
totalPages
currentPage
}
edges{
node{
id
login
avatar_url
html_url
}
}
}
}
</page-query>

<script>
import SocialInfoList from "../components/SocialInfoList"
import { Pager } from 'gridsome'
export default {
  components: {
    SocialInfoList,
    Pager
  },
  name: "SocialFollowing",
  computed: {
    socialInfo() {
      return this.$page.allUser.edges[0].node
    },
    following() {
      return this.$page.allFollowing.edges.map(item => item.node)
    }
  }
}
</script>

<style scoped>

</style>
