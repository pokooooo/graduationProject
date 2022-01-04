<template>
  <div>
    <div class="header">
      <div>

      </div>
      <div class="tag">
        <div>
          <el-tooltip :content="$store.getters.getUserData.isSign ? `今日已签到，您已经连续签到了${$store.getters.getUserData.signDay}天！` 
          : '您今天还未签到，点击签到可换取奖励！' ">
            <el-badge :is-dot="!$store.getters.getUserData.isSign">
              <i @click="sign" class="iconfont icon-qiandao"></i>
            </el-badge>
          </el-tooltip>

          
        </div>
        <div>
      <el-dropdown placement="bottom" @command="toPath" :show-timeout="50">
        <span class="el-dropdown-link">   
          <el-badge :is-dot="$store.getters.getMessageCount !== 0">
            <i class="iconfont icon-tongzhi"></i>
          </el-badge>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/user/message/notice">
            <el-badge :value="$store.getters.getNoticeList.filter(item => !item.isRead).length">
              通知
            </el-badge>
          </el-dropdown-item>
          <el-dropdown-item command="/user/message/mail">
            <el-badge :value="$store.getters.getMailList.filter(item => !item.isRead).length">
              邮件
            </el-badge>  
          </el-dropdown-item>
          <el-dropdown-item command="/user/message/chat">
            <el-badge :value="$store.getters.getChatList.filter(item => !item.isRead).length">
              私聊
            </el-badge>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
          
        </div>
      </div>
      <el-dropdown placement="bottom" @command="toPath" :show-timeout="50">
        <span class="el-dropdown-link">
          <img :src="!!$store.getters.getUserData.avatar ? $store.getters.getUserData.avatar : imgUrl" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/user/home">个人中心</el-dropdown-item>
          <el-dropdown-item command="/user/profile">账号设置</el-dropdown-item>
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
      if(path[6] === 'm' ) {
        window.sessionStorage.setItem("activePath", path.slice(14,path.length))
      }
      this.$router.push(path)
    },
    logout() {
      this.$store.commit('logout')
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    sign() {
      let data = this.$store.getters.getUserData
      if(data.isSign) {
        this.$notify({
          title: '签到失败',
          message: '您今天已经签到过了！',
          type: 'warning'
        });
        return
      }
      let gold = 0;
      data.isSign = true;
      data.diamond += 50
      data.signDay += 1;
      if(data.signDay <= 7) {
        gold = 1000 + data.signDay * 500
      } else {
        gold = 5000
      }
      data.gold += gold
      this.$store.dispatch('updata',data).then(res => {
        this.$notify({
          title: '签到成功',
          message: `您已连续签到${data.signDay}天,获取${gold}摩拉和50原石！`,
          type: 'success'
        });
      })
    }
  },
  created() {

  }
}
</script>

<style scoped>
.header {
  margin: 0 auto;
  background-color: rgb(96, 128, 136);
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

.tag {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.tag>div {
  margin: 0 10px;
}

.tag i {
  color: #000;
  font-size: 30px;
}

i:hover {
  cursor: pointer;
}


</style>
