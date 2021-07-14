<template>
  <Layout>
    项目详情
  </Layout>
</template>

<page-query>
query($id: ID!){
project(id: $id){
name
}
}
</page-query>

<script>
export default {
  name: "ProDetail"
}
</script>

<style scoped>

</style>
