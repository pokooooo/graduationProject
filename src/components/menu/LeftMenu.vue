<template>
  <div>
    <el-menu
      unique-opened
      router
      :default-active="ActivePath"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
    >
      <el-menu-item index="/rich" @click="saveActivePath('/rich')">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>富豪榜</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/goods" @click="saveActivePath('/goods')">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/orders" @click="saveActivePath('/orders')">
        <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span>订单管理</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LeftMenu extends Vue {
  public saveActivePath(activePath: string): void {
    window.sessionStorage.setItem("activePath", activePath);
  }

  public get ActivePath(): string {
    return window.sessionStorage.getItem("activePath") || "/rich";
  }
}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
