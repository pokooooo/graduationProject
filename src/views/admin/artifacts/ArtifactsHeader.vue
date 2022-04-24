<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addArtifact">添加圣遗物</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import SelectInput from "../../../components/select/Input.vue"

export default {
  name: 'ArtifactsHeader',
  components: {
    SelectInput
  },
  methods: {
    addArtifact() {
      this.$router.push("addArtifact");
    },
    select(text) {
      this.$emit("select", text);
    }
  }

}
</script>

<style scoped></style>
