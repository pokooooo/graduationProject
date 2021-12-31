<template>
  <div style="height: 100%">
    <el-menu
      style="height: 100%"
      unique-opened
      router
      :default-active="ActivePath"
      :background-color="backgroundColor"
      :text-color="color"
      active-text-color="#409eff"
    >
      <el-menu-item v-for="item in pathList" :key="item.path" :index="item.path" @click="saveActivePath(item.path)">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
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
  methods: {
      saveActivePath(activePath) {
        
        window.sessionStorage.setItem("activePath", activePath);
        
        }
  },
  computed: {
  ActivePath() {
    return window.sessionStorage.getItem("activePath") || this.pathList[0].path;
  }
  }


}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
