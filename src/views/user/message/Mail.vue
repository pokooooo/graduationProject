<template>
  <div>
  <el-container>
  <el-aside width="400px" style="height:560px">
  <el-menu
      default-active="0"
      @select="select"
      class="el-menu-vertical-demo">
      <el-menu-item v-for="(item,index) in mailList" :index="index + ''">
        <div slot="title" class="title">
          <div style="flex: 1">
            <img style="height: 40px" src="../../../assets/image/prop/yuanshi.png">
          </div>
          <div style="flex: 5;display: flex;flex-direction: column">
            <div style="line-height: 28px;font-size: 16px;font-weight: bolder">{{item.title}}</div>
            <div style="line-height: 28px">{{item.sender}}</div>
          </div>
          <div v-if="!item.isRead" style="flex: 1">
            <img style="height: 30px" src="../../../assets/image/prop/new.png">
          </div>
        </div>

      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-main>
    <div class="main">
      <div style="font-size: 24px;color: #d2bba0;font-weight: bolder;margin-bottom: 10px">{{mailData.title}}</div>
      <div style="font-size: 20px;color: #d2bba0;font-weight: bold;margin-bottom: 5px">发件人 : {{mailData.sender}}</div>
      <div style="font-size: 18px;color: #d2bba0;margin-bottom: 5px">时间 : {{mailData.sendTime | dataFormat}}</div>
      <div>{{mailData.context}}</div>
    </div>
  </el-main>
  </el-container>
  </div>
</template>

<script>

import {getMailByAccount,readMail} from "../../../network/mail"

export default {
  name: 'Mail',
  components: {
  },
  data() {
     return {
       mailList: [],
       mailData: {}
     }
  },
  computed: {

  },
  methods: {
    select(index) {
      this.mailData = this.mailList[index]
      console.log(this.mailData)
      readMail({id:this.mailList[index].id}).then(res => {
        getMailByAccount({account:this.$store.getters.getUserData.account}).then(res => {
          this.mailList = res.data.data.data
          this.$store.commit('updataMail',this.mailList)
        })
      })
    }
  },
  created() {
    getMailByAccount({account:this.$store.getters.getUserData.account}).then(res => {
      this.mailList = res.data.data.data
      this.$store.commit('updataMail',this.mailList)
      this.select(0)
    })
  }
}
</script>

<style scoped>
.title {
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
