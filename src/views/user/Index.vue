<template>
  <div>
    <div class="header">
      <el-dropdown placement="bottom" @command="toPath" :show-timeout="50">
        <span class="el-dropdown-link">
          <img :src="!!$store.getters.getAvatar ? $store.getters.getAvatar : imgUrl" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">个人中心</el-dropdown-item>
          <el-dropdown-item command="profile">账号设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
      <div class="main">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {
  },
  data() {
     return {
      imgUrl: require('../../assets/image/default.jpg'),
     }
  },
  computed: {

  },
  methods: {
    toPath(path) {
      if(path === 'logout') {
        this.logout()
        return
      }
      this.$router.push(path)
    },
    logout() {
      this.$store.commit('logout')
      this.$router.replace('/login')
    }
  },
  created() {
  }
}
</script>

<style scoped>
.header {
  margin: 0 auto;
  background-color: rgb(46, 139, 119);
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1200px;
}

.header img {
  width: 40px;
  height: 40px;
  border-radius: 50px;
}

.main {
  margin: 0 auto;
  width: 1200px;
}
</style>
