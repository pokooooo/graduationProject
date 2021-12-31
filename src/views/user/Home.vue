<template>
  <div>
    <div class="header">
      <img :src="!!$store.getters.getUserData.avatar ? $store.getters.getUserData.avatar : imgUrl" alt="">
      <div class="title">
        <div>{{$store.getters.getUserData.nickname}}</div>
        <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect">
            <el-menu-item index="1">基本信息</el-menu-item>
            <el-menu-item index="2">资产信息</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="main">
      <div v-if="activeIndex === '1'">
        <el-form>
          <el-form-item label="账号名:">
            <span>{{$store.getters.getUserData.account}}</span>
          </el-form-item>
          <el-form-item label="等级:">
            <span>{{$store.getters.getUserData.level}}</span>
          </el-form-item>
          <el-form-item label="经验值:">
            <el-progress style="width: 200px;display:inline-block" text-inside :stroke-width="16"
            :percentage="$store.getters.getUserData.experience / $store.getters.getUserData.level"></el-progress>
            <span>
                {{$store.getters.getUserData.experience}} / {{$store.getters.getUserData.level * 100}}
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <el-form>
          <el-form-item>
            <img class="prop" src="../../assets/image/prop/yuanshi.png" alt="">
            :
            <span style="margin-left: 5px">{{$store.getters.getUserData.diamond}}</span>
          </el-form-item>
          <el-form-item>
            <img class="prop" src="../../assets/image/prop/mola.png" alt="">
            :
            <span style="margin-left: 5px" >{{$store.getters.getUserData.gold}}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
     return {
      imgUrl: require('../../assets/image/default.jpg'),
      activeIndex: '1'
     }
  },
  computed: {

  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
    }
  },
  created() {

  }
}
</script>

<style scoped>
.header {
  height: 150px;
  display: flex;
  align-items: flex-end;
}

.header img {
  height: 120px;
  width: 120px;
  border-radius: 50%;
}

.title {
  height: 100%;
  margin-left: 40px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  margin: 20px 0 0 20px;
}

.prop {
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
</style>
