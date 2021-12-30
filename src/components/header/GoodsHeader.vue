<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addGoods">添加商品</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import SelectInput from "../select/Input.vue"

export default {
  name: 'GoodsHeader',
  components: {
    SelectInput
  },
  methods: {
  addGoods() {
    this.$router.push("add");
  },
  select(text) {
    this.$emit("select", text);
  }
  }

}
</script>

<style scoped></style>
