<template>
    <div>
        <el-input
                placeholder="请输入内容"
                v-model="text"
                @clear="select"
                clearable
        >
            <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="select"
            ></el-button>
        </el-input>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class SelectInput extends Vue {
        private text = "";

        public select(): void {
            this.$emit("select", this.text);
        }
    }
</script>

<style scoped></style>
