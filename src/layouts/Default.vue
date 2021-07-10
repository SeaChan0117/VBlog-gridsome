<template>
  <el-container>
    <el-header :height="'20rem'">
      <div>
        <h1 class="project-name">SeaChan0117</h1>
        <h2 class="project-tagline">欢迎来到SeaChan0117的个人博客。</h2>
        <a :href="'https://github.com/SeaChan0117'" class="btn" target="_blank">GitHub主页</a>
        <a href="https://github.com/GitHub-Laziji/vblog" class="btn" target="_blank">博客源码</a>
      </div>
    </el-header>

    <el-main class="main-content">
      <el-card>
        <el-row :gutter="10" style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
          <el-col :span="2">
            <el-dropdown trigger="click" placement="bottom-start" @command="handleCommand" style="cursor: pointer">
          <span>
            了解博主<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="https://github.com/SeaChan0117">github主页</el-dropdown-item>
                <el-dropdown-item command="https://seachan0117.github.io/">其他博客</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="2">
            <el-dropdown trigger="click" placement="bottom-start" @command="handleCommand" style="cursor: pointer">
          <span>
            其他网站<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="http://117.50.1.138:8080/">realworld</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="14"></el-col>
          <el-col :span="4">
            <div>
              <div style="font-size: 20px;color:#606266;margin-top: 5px">
                <b>SeaChan0117</b>
              </div>
              <div style="color:#606266;">
                <i class="el-icon-location"></i>&nbsp;{{ location ? location : '未填写地址' }}
                <br>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <el-avatar shape="square" :size="60" fit="cover" :src="avatarUrl"></el-avatar>
          </el-col>
        </el-row>
      </el-card>

      <div class="main-body" style="text-align: left;margin-top: 2rem">
        <el-row>
          <el-col :span="5" style="padding-right:10px">
            <el-card>
              <el-menu
                  :router="true"
                  :default-active="activeRouter"
              >
                <el-menu-item index="/">
                  <i class="el-icon-star-off"></i>
                  <span slot="title">最新动态</span>
                </el-menu-item>
                <el-menu-item index="/relation">
                  <i class="el-icon-mobile-phone"></i>
                  <span slot="title">社交圈</span>
                </el-menu-item>
                <el-menu-item index="/blogs">
                  <i class="el-icon-edit-outline"></i>
                  <span slot="title">博客列表</span>
                </el-menu-item>
                <el-menu-item index="/project-open-source">
                  <i class="el-icon-service"></i>
                  <span slot="title">开源项目</span>
                </el-menu-item>
              </el-menu>
            </el-card>
          </el-col>
          <el-col :span="19" style="padding-left:10px">
            <slot/>
          </el-col>
        </el-row>
      </div>
    </el-main>

    <el-footer class="main-content" :height="'8rem'" style="line-height: 8rem">
      <el-row>
        <el-col :span="10">
          <div>
            © 2021 GitHub-sechan0117&emsp;&emsp;
            <a href="https://github.com/GitHub-Laziji" target="_blank">Profile</a>&emsp;&emsp;
            <a href="https://github.com/GitHub-Laziji/vblog" target="_blank">VBlog</a>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="text-align: center;font-size: 18px">
            <i class="el-icon-location-outline"></i>
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <a href="https://developer.github.com" target="_blank">GitHub-API</a>&emsp;&emsp;
            <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>&emsp;&emsp;
            <a href="http://element.eleme.io/" target="_blank">Element</a>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<static-query>
query {
metadata {
siteName
}
}
</static-query>

<script>
export default {
  data() {
    return {
      avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      location: ''
    }
  },
  methods: {
    handleCommand(command) {
      window.open(command, '_blank')
    }
  },
  computed: {
    activeRouter() {
      return this.$route.path || '/'
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
