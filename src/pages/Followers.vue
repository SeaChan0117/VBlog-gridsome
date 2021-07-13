<template>
  <Layout>
    <SocialInfoList :socialInfoData="followers" :basePath="'/followers'"></SocialInfoList>

    <div style="text-align: center" v-if="!$route.query.username">
      <Pager :info="$page.allFollowers.pageInfo"/>
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

allFollowers(perPage:9,page:$page) @paginate{
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
  name: "SocialFollowers",
  computed: {
    followers() {
      return this.$page.allFollowers.edges.map(item => item.node)
    }
  }
}
</script>

<style scoped>

</style>
