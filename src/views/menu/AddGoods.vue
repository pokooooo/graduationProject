<template>
  <div>
    <el-card>
      <el-alert
        :title="title"
        type="info"
        center
        close-text="返回"
        :show-icon="false"
        @close="back"
      ></el-alert>
      <el-steps
        :space="300"
        :active="activeIndex * 1"
        finish-status="success"
        align-center
      >
        <el-step title="商品图片"></el-step>
        <el-step title="商品名称"></el-step>
        <el-step title="商品价格"></el-step>
        <el-step title="是否限购"></el-step>
        <el-step title="限购数量"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form ref="form" :model="addForm" label-position="top">
        <el-tabs
          tab-position="left"
          v-model="activeIndex"
          :before-leave="beforeLeave"
        >
          <el-tab-pane label="商品图片" name="0">
            <el-upload
              class="avatar-uploader"
              action="/api/console/form/upload_v2"
              :show-file-list="false"
              :on-change="handleChange"
            >
              <img v-if="addForm.cover" :src="addForm.cover" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品名称" name="1">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.title"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品价格" name="2">
            <el-form-item label="商品价格" prop="goods_name">
              <el-input v-model="addForm.price"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="是否限购" name="3">
            <el-switch
              v-model="limited"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-top: 20px"
              active-text="限购"
              inactive-text="不限购"
              @change="change"
            >
            </el-switch>
          </el-tab-pane>
          <el-tab-pane label="限购数量" name="4">
            <el-form-item label="限购数量" prop="goods_name">
              <el-input v-model="addForm.limit" :disabled="!limited"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="完成" name="5">
            <el-button
              type="primary"
              v-if="title === '添加商品'"
              @click="addGood"
              style="margin-top: 20px"
              >添加商品</el-button
            >
            <el-button
              type="primary"
              v-else
              @click="setGood"
              style="margin-top: 20px"
              >修改商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { addGoods, setGoods } from "@/network/goods";

@Component
export default class Goods extends Vue {
  private addForm: {
    title: string;
    price: number;
    cover: string;
    limit: number;
    id?: string;
  } = {
    title: "",
    price: 0,
    cover: "",
    limit: 0,
  };

  private title = "添加商品";

  private limited = false;

  private activeIndex = 0;

  handleChange(info: any): void {
    if (info.status === "ready") {
      return;
    }
    if (info.status === "success") {
      let avatar = info.response.data.file;
      avatar = "http://localhost:3000" + avatar;
      this.addForm.cover = avatar;
      this.addForm.title = info.name.slice(0, info.name.indexOf("."));
    }
  }

  public addGood(): void {
    addGoods(this.addForm).then((res) => {
      this.$message.success("添加成功！");
      this.$router.push("/goods");
    });
  }

  public setGood(): void {
    this.addForm.id = this.$route.params.id;
    setGoods(this.addForm).then((res) => {
      this.$message.success("修改成功！");
      this.$router.push("/goods");
    });
  }

  change(): void {
    if (!this.limited) {
      this.addForm.limit = 0;
    }
  }

  back(): void {
    this.$router.back();
  }

  beforeLeave(activeName: string, oldActiveName: any): any {
    if (
      activeName === "5" &&
      (this.addForm.title === "" || this.addForm.cover === "")
    ) {
      this.$message.error("请先补全商品信息");
      return false;
    }
  }

  public created(): void {
    if (this.$route.params.name !== undefined) {
      this.title = this.$route.params.name;
      this.addForm.title = this.$route.params.title;
      this.addForm.price = parseInt(this.$route.params.price);
      this.addForm.cover = this.$route.params.cover;
      if (parseInt(this.$route.params.price) !== 0) {
        this.limited = true;
        this.addForm.limit = parseInt(this.$route.params.limit);
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
