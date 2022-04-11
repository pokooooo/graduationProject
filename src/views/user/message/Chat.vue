<template>
  <div>
    <el-container>
      <el-aside width="300px" style="height:560px">
        <el-menu
            default-active="0"
            @select="select"
            class="el-menu-vertical-demo">
          <el-menu-item v-for="(item,index) in chatList" :key="item.id" :index="index + ''">
            <div slot="title" class="title">
              <div style="flex: 1;margin-right: 5px">
                <img style="height: 40px;border-radius: 50px" :src="item.account1 === item.admin ? item.avatar2 : item.avatar1">
              </div>
              <div style="flex: 5;line-height: 28px;font-size: 16px;font-weight: bolder">
                {{item.account1 === item.admin ? item.nickname2 : item.nickname1}}
              </div>
<!--              <div v-if="!item.isRead" style="flex: 1">-->
<!--                <img style="height: 30px" src="../../../assets/image/prop/new.png">-->
<!--              </div>-->
            </div>

          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div style="display: flex;flex-direction: column">
          <div style="height: 480px">
            123
          </div>
          <div style="flex: 1;display: flex;align-items: center">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <div></div>
            <el-button type="primary" @click="sendChat" round>发送</el-button>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>



import {getChatByAccount,sendChat} from "@/network/chat";


export default {
  name: 'Char',
  components: {
  },
  data() {
     return {
       chatList: [],
       chatData: {},
       input: ''
     }
  },
  computed: {

  },
  methods: {
    select(index) {
      this.chatData = this.chatList[index]
    },
    sendChat() {
      let data = this.chatData
      sendChat({id: data.id, content: {sender: data.admin, type: 'text', context: this.input}}).then(res => {
      })
    },
    getChatByAccount(to = 'null') {
      getChatByAccount({account:this.$store.getters.getUserData.account,to}).then(res => {
        let chatList = res.data.data.data
        chatList.map(item => {
          // if(item.account1 === this.$store.getters.getUserData.account) {
          //   item.num = 1
          // } else {
          //   item.num = 2
          // }
          item.admin = this.$store.getters.getUserData.account
        })
        this.chatList = chatList
        this.$store.commit('updataChat',this.chatList)
      })
    }
  },

  created() {
    this.getChatByAccount(this.$route.params.account)
  }
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
}


</style>
