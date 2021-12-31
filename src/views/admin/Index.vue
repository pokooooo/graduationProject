<template>
  <div>
    <el-container class="home-container">
      <el-header class="header">
        <img src="../../assets/image/peko.jpg" alt="" />
        <div class="title">原来你也玩原神后台</div>
        <div class="nickname">你好 , {{ nickname }}</div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <left-menu :backgroundColor="'#333744'" :color="'#fff'" :pathList="pathList"></left-menu>
        </el-aside>
        <el-main style="height: calc(100vh - 60px)">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import LeftMenu from "../../components/menu/LeftMenu.vue";
import { logout } from "@/network/login";

export default {
  name: 'Index',
  components: {
    LeftMenu
  },
  data() {
    return {
      nickname: window.sessionStorage.getItem("nickname") || "",
      pathList: [
        {
          name: '用户管理',
          path: 'users',
          icon: 'el-icon-user-solid'
        },
        {
          name: '人物管理',
          path: 'roles',
          icon: 'el-icon-s-custom'
        },
                {
          name: '商品管理',
          path: 'goods',
          icon: 'el-icon-s-goods'
        },
                {
          name: '订单管理',
          path: 'orders',
          icon: 'el-icon-s-claim'
        }
      ]
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
