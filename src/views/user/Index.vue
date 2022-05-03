<template>
  <div class="index">
    <div class="header">
      <div class="list">
        <div class="item" @click="toPath(item.path)"  v-for="item in list" :key="item.path">
          <img style="height: 50px;width: 66px;" :src="item.url" alt="">
        </div>
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
        <div>
          <el-badge :is-dot="$store.getters.getUserData.friendRequest.length !== 0">
            <i @click="friend" class="iconfont icon-31haoyou"></i>
          </el-badge>
        </div>
      </div>
      <el-dropdown placement="bottom" @command="toPath" :show-timeout="50">
        <span class="el-dropdown-link">
          <img style="  width: 40px;
  height: 40px;
  border-radius: 50px;" :src="!!$store.getters.getUserData.avatar ? $store.getters.getUserData.avatar : imgUrl" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/user/center">个人中心</el-dropdown-item>
          <el-dropdown-item command="/user/profile">账号设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
        title="您的好友"
        :visible.sync="dialogVisible"
        style="position: fixed;left: 860px;top: -100px"
        width="40%"
    >
      <div style="display: flex;flex-direction: column;justify-content: center">
        <div style="display: flex;align-items: center;border-radius: 50px;width: 100%;border: #d2bba0 solid 1px;margin-bottom: 5px"
             v-for="item in friendsList" :key="item.account">
          <img style="height: 50px;border-radius: 50px;margin-right: 10px" :src="item.avatar" alt="">
          <div style="display: flex;flex: 1;flex-direction: column;justify-content: center">
            <div>{{item.nickname}}</div>
            <div style="display: flex">
              <span style="width: 35px">Lv.{{item.level}}</span>
              <span style="color: green" v-if="item.isOnline">在线</span>
              <span style="color: #544f4f" v-else>离线</span>
            </div>
          </div>
          <div style="width: 80px" >
            <el-button v-if="item.twoWay" size="mini" @click="newChat(item.account,item.nickname,item.avatar)" type="success" icon="el-icon-chat-dot-round" circle></el-button>
            <el-tooltip class="item" effect="dark" content="成为双向好友后解锁此功能" placement="top">
              <el-button v-if="!item.twoWay" size="mini" type="info" icon="el-icon-chat-dot-round" circle></el-button>
            </el-tooltip>
            <el-popconfirm
                title="确定要删除吗？"
                @confirm="deleteFriend(item.account)"
                icon-color="red"
                style="margin-left: 5px"
            >
              <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </el-popconfirm>
<!--            <el-button size="mini" @click="deleteFriend(item.account)" type="danger" icon="el-icon-delete" circle></el-button>-->
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible1 = true">添加好友</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="添加好友"
        :visible.sync="dialogVisible1"
        width="30%"
    >
      <div>
        <el-input v-model="input" placeholder="请输入好友账号"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="friendRequest">添加好友</el-button>
      </span>
    </el-dialog>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>


</template>

<script>

import {setUser,getUser} from "@/network/user"
import {friendRequest,friendAccepted,getFriendData,deleteFriend} from "@/network/friend";
import {getChatByAccount, newChat} from "@/network/chat";
import {logout1} from "@/network/login";
import {getMailByAccount} from "@/network/mail";

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      list: [{
        label: '首页',
        path: '/user/home',
        url: require('../../assets/image/prop/home.png')
      },{
        label: '商城',
        path: '/user/store',
        url: require('../../assets/image/prop/store.png')
      },{
        label: '副本',
        path: '/user/domain',
        url: require('../../assets/image/prop/domain.png')
      },{
        label: '人物',
        path: '/user/role',
        url: require('../../assets/image/prop/role.png')
      },{
        label: '仓库',
        path: '/user/inventory',
        url: require('../../assets/image/prop/inventory.png')
      },{
        label: '祈愿',
        path: '/user/event',
        url: require('../../assets/image/prop/event.png')
      },

      ],
      imgUrl: require('../../assets/image/default.jpg'),
      dialogVisible: false,
      dialogVisible1: false,
      input: '',
      friendsList: [],
      interval: {}
    }
  },
  computed: {},
  methods: {

    toPath(path) {
      if (path === 'logout') {
        this.logout()
        return
      }
      if (path[6] === 'm') {
        window.sessionStorage.setItem("activePath", path.slice(14, path.length))
      }
      this.$router.push(path)
    },
    logout() {
      logout1({account:this.$store.getters.getUserData.account}).then( () => {})
      this.$store.commit('logout')
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    friendRequest() {
      friendRequest({sender: this.$store.getters.getUserData.account,receiver: this.input}).then(res => {
        if (res.data.stat === "ok") {
          this.$store.commit('updata',res.data.data.data)
          this.$message.success(res.data.data.msg);
          this.getFriendData()
        } else this.$message.error(res.data.msg);
      })

      this.dialogVisible1 = false
    },
    deleteFriend(account) {
      deleteFriend({sender: this.$store.getters.getUserData.account,account}).then(res => {
        this.$store.commit('updata',res.data.data.data)
        this.getFriendData()
      })
    },
    friend() {
      if(this.$store.getters.getUserData.friendRequest.length !== 0) {
        this.$confirm(`${this.$store.getters.getUserData.friendRequest[0]}请求添加你为好友`, '好友请求', {
          confirmButtonText: '接受',
          cancelButtonText: '拒绝',

        }).then(() => {
          friendAccepted({isAccepted:true,sender: this.$store.getters.getUserData.friendRequest[0],
            receiver: this.$store.getters.getUserData.account}).then(res => {
            this.$store.commit('updata',res.data.data.data)
            this.getFriendData()
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          })
        }).catch(() => {
          friendAccepted({isAccepted:false,sender: this.$store.getters.getUserData.friendRequest[0],
            receiver: this.$store.getters.getUserData.account}).then(res => {
            this.$store.commit('updata',res.data.data.data)
            this.$message({
              type: 'info',
              message: '拒绝成功'
            });
          })
        });
      } else {
        this.getFriendData()
        this.dialogVisible = true

      }
    },
    getFriendData() {
      getFriendData({data: this.$store.getters.getUserData.friends}).then(res => {
        this.friendsList = res.data.data.data
      })
    },
    newChat(account,nickname,avatar) {
      newChat({account1: this.$store.getters.getUserData.account, nickname1: this.$store.getters.getUserData.nickname,
      account2: account,nickname2: nickname, avatar1: this.$store.getters.getUserData.avatar , avatar2: avatar}).then(res => {
        this.dialogVisible = false
        window.sessionStorage.setItem("activePath", 'chat')
        if(this.$route.path.indexOf('/user/message/chat') !== -1) {
          this.$bus.$emit("changeIndex", account);
        } else {
          this.$router.push({
            path: "/user/message/chat",
            name: 'chat',
            params: {account}
          })
        }
      })
    },
    sign() {
      let data = this.$store.getters.getUserData
      if (data.isSign) {
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
      if (data.signDay <= 7) {
        gold = 1000 + data.signDay * 500
      } else {
        gold = 5000
      }
      data.gold += gold
      this.$store.dispatch('updata', data).then(res => {
        this.$notify({
          title: '签到成功',
          message: `您已连续签到${data.signDay}天,获取${gold}摩拉和50原石！`,
          type: 'success'
        });
      })
    }
  },
  created() {
    this.interval = setInterval(() => {
      getUser({account: this.$store.getters.getUserData.account}).then(res => {
        this.$store.commit('updata',res.data.data.data)
        this.getFriendData()
      })
      getMailByAccount({account: this.$store.getters.getUserData.account}).then(res => {
        this.$store.commit('updataMail',res.data.data.data)
      })
      getChatByAccount({account:this.$store.getters.getUserData.account}).then(res => {
        this.$store.commit('updataChat',res.data.data.data)
      })
    },5000)
  },
  destroyed() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.index {
  background: url("../../assets/image/prop/qiyuan.png") center no-repeat;
}

.header {
  margin: 0 auto;
  background-color: #596171;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.header img {

}

.main {
  margin: 0 auto;
  width: 1300px;
  height: calc(100vh - 55px);
}

.list {
  display: flex;
  align-items: center;
  margin-right: 100px;
}

.item {
  width: 100px;
}

.item:hover {
  cursor:pointer
}

.tag {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.tag > div {
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
