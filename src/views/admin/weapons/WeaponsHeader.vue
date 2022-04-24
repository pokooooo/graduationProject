<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addWeapon">添加材料</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import SelectInput from "../../../components/select/Input.vue"

export default {
  name: 'WeaponsHeader',
  components: {
    SelectInput
  },
  methods: {
  addWeapon() {
    this.$router.push("addWeapon");
  },
  select(text) {
    this.$emit("select", text);
  }
  }

}
</script>

<style scoped></style>
