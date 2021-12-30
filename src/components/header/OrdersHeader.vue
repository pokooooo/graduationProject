<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import SelectInput from "../select/Input.vue"


export default {
  name: 'OrdersHeader',
  components: {
    SelectInput
  },
  methods: {
  select(text) {
    this.$emit("select", text);
  }
  }

}
</script>

<style scoped></style>
