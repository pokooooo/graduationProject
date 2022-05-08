<template>
  <div>
    <el-container>
      <el-aside width="300px" >
        <el-menu
            :default-active="index + ''"
            @select="select"
            class="el-menu-vertical-demo">
          <el-menu-item v-for="(item,index) in chatList.filter(i => i.active)" :key="item.id" :index="index + ''">
            <div slot="title" class="title">
              <div style="flex: 1;margin-right: 5px">
                <img style="height: 40px;border-radius: 50px" :src="item.account1 === $store.getters.getUserData.account ? item.avatar2 : item.avatar1">
              </div>
              <div style="flex: 5;line-height: 28px;font-size: 16px;font-weight: bolder">
                {{item.account1 === $store.getters.getUserData.account ? item.nickname2 : item.nickname1}}
              </div>
              <div >
                <i style="font-size: 22px" @click="deleteChat(item.id,index)" class="el-icon-circle-close"></i>
              </div>
            </div>

          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main v-if="this.$store.getters.getChatList.length !== 0">
        <div style="display: flex;flex-direction: column;height: 100%">
          <div style="height: 40px;text-align: end;margin-right: 20px">
            <el-button type="danger" @click="clearChat" plain>清除聊天记录</el-button>
          </div>
          <div style="height: 500px;display: flex;flex-direction: column;overflow-y:auto">
            <div v-for="item in chatData.list">
              <div v-if="$store.getters.getUserData.account === item.sender"  style="display: flex;height: 60px">
                <div style="display: flex;align-items: center">
                  <img style="height: 50px;border-radius: 50px" :src="chatData.account1 === item.sender ? chatData.avatar1 : chatData.avatar2" alt="">
                  <div style="display: flex;flex-direction: column;margin-left: 5px">
                    <div style="height: 20px">{{chatData.account1 === item.sender ? chatData.nickname1 : chatData.nickname2}}</div>
                    <div style="flex: 1">{{item.context}}</div>
                  </div>
                </div>
              </div>
              <div v-else  style="display: flex;height: 60px;justify-content: flex-end">
                <div style="display: flex;align-items: center">

                  <div style="display: flex;flex-direction: column;align-items: flex-end;margin-right: 5px">
                    <div style="height: 20px">{{chatData.account1 === item.sender ? chatData.nickname1 : chatData.nickname2}}</div>
                    <div style="flex: 1">{{item.context}}</div>
                  </div>
                  <img style="height: 50px;border-radius: 50px" :src="chatData.account1 === item.sender ? chatData.avatar1 : chatData.avatar2" alt="">
                </div>
              </div>
            </div>

          </div>
          <div  style="flex: 1;display: flex;align-items: center">
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



import {getChatByAccount, sendChat, deleteChat, clearChat} from "@/network/chat";
import {getUser} from "@/network/user";


export default {
  name: 'Char',
  components: {
  },
  data() {
     return {
       chatList: [],
       chatData: {},
       input: '',
       index: 0,
       interval: {}
     }
  },
  computed: {

  },
  methods: {
    select(index) {
      this.index = index
      this.chatData = this.chatList[index]
    },
    sendChat() {
      sendChat({id: this.chatData.id, content: {sender: this.$store.getters.getUserData.account, type: 'text', context: this.input}}).then(res => {
        this.getChatByAccount()
        this.input = ''
      })
    },
    getChatByAccount() {
      getChatByAccount({account:this.$store.getters.getUserData.account}).then(res => {

        if(res.data.data.data !== 0) {
          this.chatList = res.data.data.data
          this.chatData = this.chatList[this.index]
          this.$store.commit('updataChat',this.chatList)
        }
      })
    },
    deleteChat(id,index) {
      deleteChat({id}).then(() => {
        if(this.index !== '0' && index <= this.index * 1) this.index--
        this.getChatByAccount()
      })
    },
    clearChat() {
      clearChat({id: this.chatData.id}).then(() => {
        this.getChatByAccount()
      })
    }

  },

  created() {
    this.$store.getters.getChatList.map((item,index) => {
      if(item.account1 === this.$route.params.account || item.account2 === this.$route.params.account){
        this.index = index
      }
    })

    this.$bus.$on("changeIndex", account => {
      this.getChatByAccount()
      setTimeout(() => {
        this.$store.getters.getChatList.map((item,index) => {
          if(item.account1 === account || item.account2 === account){
            this.select(index)
          }
        })
      },400)
    })

    this.getChatByAccount()

    this.interval = setInterval(() => {
      this.getChatByAccount()
    },1000)
  },
  destroyed() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
}

.left {
  justify-content: left;
}

.right {
  justify-content: right;
}


</style>
