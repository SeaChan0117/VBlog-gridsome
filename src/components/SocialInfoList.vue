<template>
  <el-row style="min-height: 200px;" v-if="socialInfoData.length">
    <el-col :span="8" v-for="(item,index) in socialInfoData" :key="'followers'+index" style="padding: 10px">
      <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
        <i class="el-icon-star-off"></i>&emsp;
        <a @click="$router.push(`/user/social/details/${item.login}`)"
           style=" text-decoration:none;cursor:pointer">{{ item.login }}</a>
        <br>
        <i class="el-icon-message"></i>&emsp;
        <a :href="item.html_url" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
        <br>
        <img :src="item.avatar_url" style="width: 100%;border-radius:5px;margin-top: 5px">
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SocialInfoList",
  props: {
    socialInfoData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
