<template>
  <div style="height: 755px;background-color: #fff;opacity: 0.8">
    <div class="header">
        <div style="margin-left: 20px;font-size: 24px">
            消息中心
        </div>
    </div>
    <div class="main">
      <el-container style="height: 100%">
        <el-aside width="240px">
          <left-menu :backgroundColor="'#f7f7f7'" :pathList="pathList"></left-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>

import LeftMenu from "../../../components/menu/LeftMenu.vue";

export default {
  name: 'Index',
  components: {
      LeftMenu
  },
  data() {
     return {
         pathList: [

                          {
                 name: '邮件',
                 path: 'mail',
                 icon: 'el-icon-message'
             },
                          {
                 name: '私信',
                 path: 'chat',
                 icon: 'el-icon-chat-line-round'
             },
         ]
     }
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
}
</script>

<style scoped>
.header {

  height: 60px;
  display: flex;
  align-items: center;
}

.main {
    height: 685px;
}

</style>
