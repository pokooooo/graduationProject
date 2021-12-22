<template>
  <div>
    <el-container class="home-container">
      <el-header class="header">
        <img src="../assets/image/peko.jpg" alt="" />
        <div class="title">花光他们的钱管理后台</div>
        <div class="nickname">你好 , {{ nickname }}</div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <left-menu></left-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import LeftMenu from "../components/menu/LeftMenu.vue";
import { logout } from "@/network/login";

export default {
  name: 'Home',
  components: {
    LeftMenu
  },
  data() {
    return {
      nickname: window.sessionStorage.getItem("nickname") || ""
    }
  },
  methods: {
   logout() {
    logout(window.sessionStorage.getItem("token")).then((res) => {
      window.sessionStorage.clear();
      this.$message.success("退出成功！");
      this.$router.replace("/login");
    });
  }
  }
}
</script>

<style scoped>
.home-container {
  height: 100vh;
}

.el-header {
  background-color: #373d41;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.header {
  display: flex;
  align-items: center;
  position: relative;
}

.header > img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.title {
  color: #fff;
  font-size: 25px;
  margin-left: 30px;
}

.nickname {
  color: #fff;
  position: absolute;
  right: 120px;
}

.header > .el-button {
  position: absolute;
  right: 20px;
}
</style>
