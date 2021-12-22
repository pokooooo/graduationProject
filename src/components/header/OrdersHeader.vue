<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
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
export default class OrdersHeader extends Vue {

  public select(text:string): void {
    this.$emit("select", text);
  }
}
</script>

<style scoped></style>
