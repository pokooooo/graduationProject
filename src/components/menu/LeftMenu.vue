<template>
  <div style="height: 100%">
    <el-menu
        v-if="pathList.length !== 8"
      style="height: 100%"
      unique-opened
      router
      :default-active="path"
      :background-color="backgroundColor"
      :text-color="color"
      active-text-color="#409eff"
    >
      <el-menu-item v-for="item in pathList" :key="item.path"  :index="item.path" @click="saveActivePath(item.path)">
        <template  slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
      </el-menu-item>
    </el-menu>
    <el-menu
        v-else
        style="height: 100%"
        unique-opened
        router
        :default-active="path"
        :background-color="backgroundColor"
        :text-color="color"
        active-text-color="#409eff"
    >
      <el-menu-item  v-for="item in pathList" :key="item.path"  :index="item.path" @click="saveActivePath(item.path)">
        <template slot="title">
          <img :class="item.path === path ? 'active' : ''" style="height: 46px" :src="item.url" alt="">
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'LeftMenu',
  props: {
    pathList: {
      type: Array,
      default() {
        return []
      }
    },
      backgroundColor: {
        type: String,
        default() {
          return ''
        }
      },
      color: {
        type: String,
        default() {
          return '#000'
        }
      }
  },
  data() {
    return {
      path: ''
    }
  },
  methods: {
      saveActivePath(activePath) {
        this.path = activePath
        window.sessionStorage.setItem("activePath", activePath);
        }
  },
  computed: {

  },
  created() {
    if(!window.sessionStorage.getItem("activePath")) {
      this.path = this.pathList[0].path
    } else {
      this.path = window.sessionStorage.getItem("activePath")
    }
  }
}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
.active {
  transform: scale(1.1);
  overflow: hidden;
}
</style>
