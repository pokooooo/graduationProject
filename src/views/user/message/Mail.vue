<template>
  <div>
  <el-container>
  <el-aside width="400px" style="height:645px">
  <el-menu
      :default-active="index + ''"
      @select="select"
      class="el-menu-vertical-demo">
      <el-menu-item v-for="(item,index) in mailList" :key="index" :index="index + ''">
        <div slot="title" class="title">
          <div style="flex: 1">
            <img v-if="item.materialsList.length !== 0"  style="height: 40px" :src="item.materialsList[0].cover">
            <img v-else-if="item.diamond !== 0"  style="height: 40px" src="../../../assets/image/prop/yuanshi.png">
            <img v-else style="height: 40px" src="../../../assets/image/prop/mola.png">
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
    <div v-if="mailList.length !== 0" class="main">
      <div style="flex: 1">
        <div style="font-size: 24px;color: #d2bba0;font-weight: bolder;margin-bottom: 10px">{{mailData.title}}</div>
        <div style="font-size: 20px;color: #d2bba0;font-weight: bold;margin-bottom: 5px">发件人 : {{mailData.sender}}</div>
        <div style="font-size: 18px;color: #d2bba0;margin-bottom: 10px">时间 : {{mailData.sendTime | dataFormat}}</div>
        <div>{{mailData.context}}</div>
      </div>
      <div style="display: flex;height: 60px">
        <div v-for="item in mailData.materialsList" :key="item.id" style="margin-right: 10px;position: relative">
          <img class="prop" :src="item.cover" alt="">
          <i v-if="mailData.isReceive" style="font-size: 40px;position: absolute;left: 10px;bottom: 13px;color: #72e772" class="iconfont icon-dui"></i>
          <div style="font-size: 14px;position: absolute;left: 0;bottom: 0;color: #fff;background: #544f4f;width: 60px;text-align: center;
          border-radius: 0 0 2px 2px">{{item.num}}</div>
        </div>
        <div v-if="mailData.diamond !== 0" style="margin-right: 10px;position: relative">
          <img class="prop" src="../../../assets/image/prop/yuanshi.png" alt="">
          <i v-if="mailData.isReceive" style="font-size: 40px;position: absolute;left: 10px;bottom: 13px;color: #72e772" class="iconfont icon-dui"></i>
          <div style="font-size: 14px;position: absolute;left: 0;bottom: 0;color: #fff;background: #544f4f;width: 60px;text-align: center;
          border-radius: 0 0 2px 2px">{{mailData.diamond}}</div>
        </div>
        <div  v-if="mailData.gold !== 0" style="position: relative">
          <img  class="prop" src="../../../assets/image/prop/mola.png" alt="">
          <i v-if="mailData.isReceive" style="font-size: 40px;position: absolute;left: 10px;bottom: 13px;color: #72e772" class="iconfont icon-dui"></i>
          <div style="font-size: 14px;position: absolute;left: 0;bottom: 0;color: #fff;background: #544f4f;width: 60px;text-align: center;
          border-radius: 0 0 2px 2px">
            {{mailData.gold}}</div>
        </div>
      </div>
      <div style="height: 40px;text-align: end;margin: 20px 20px 0 0">
        <el-button v-if="!mailData.isReceive" type="success" @click="receiveMail"  round>领取</el-button>
        <el-button v-else type="danger" @click="deleteMail" round>删除邮件</el-button>
      </div>
    </div>
  </el-main>
  </el-container>
  </div>
</template>

<script>

import {getMailByAccount,readMail,receiveMail,deleteMail} from "../../../network/mail"

export default {
  name: 'Mail',
  components: {
  },
  data() {
     return {
       mailList: [],
       mailData: {},
       index: 0
     }
  },
  computed: {

  },
  methods: {
    select(index) {
      this.index = index
      this.mailData = this.mailList[index]
      if(!this.mailData.isRead) {
        readMail({id:this.mailData.id}).then(res => {
          this.getMailByAccount()
        })
      }
    },
    receiveMail() {
      receiveMail({id: this.mailData.id}).then(() => {
        this.$notify({
          title: '领取成功',
          // message: this.mailData.diamond !== 0 ? `获得${this.mailData.diamond}原石和${this.mailData.gold}摩拉！` : `获得${this.mailData.gold}摩拉！`,
          type: 'success'
        });
        this.getMailByAccount()
      })
    },
    deleteMail() {
      deleteMail({id: this.mailData.id}).then(() => {
        if(this.index !== 0) {
          this.index--
        }
        this.getMailByAccount()
      })
    },
    getMailByAccount() {
      getMailByAccount({account:this.$store.getters.getUserData.account}).then(res => {
        this.mailList = res.data.data.data
        console.log(this.mailList)
        this.$store.commit('updataMail',this.mailList)
        this.select(this.index)
      })
    }
  },
  created() {
    this.getMailByAccount()
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
  height: 100%;
}

.prop {
  vertical-align: middle;
  width: 60px;
  height: 60px;
}

img {
  border-radius: 2px;
}


</style>
