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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectInput from "../select/SelectInput.vue"

@Component({
  components: {
    SelectInput
  }
})
export default class GoodsHeader extends Vue {

  public addGoods(): void {
    this.$router.push("/add");
  }
  public select(text:string): void {
    this.$emit("select", text);
  }
}
</script>

<style scoped></style>
