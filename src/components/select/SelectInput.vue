<template>
    <div>
  <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
    <el-select v-model="type" slot="prepend" placeholder="请选择">
      <el-option v-for="(item,index) in typeList" :label="item.label" :value="item.value" :key="index"></el-option>
    </el-select>
            <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="select"
            ></el-button>
  </el-input>
  
    </div>
</template>

<script>

    export default {
        name: 'SelectInput',
  props: {
    typeList: {
      type: Array,
      default() {
        return []
      }
    }
  },
        data() {
            return {
                keyword: "",
                type: ""
            }
        },
        methods: {
        select() {
            this.$emit("select", {type: this.type,keyword: this.keyword});
        }
        }


    }
</script>

<style scoped></style>
