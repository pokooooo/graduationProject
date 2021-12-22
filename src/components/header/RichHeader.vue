<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true"
          >添加富豪</el-button
        >
      </el-col>
    </el-row>
    <el-dialog
      title="添加富豪"
      :visible.sync="dialogVisible"
      width="30%"
      @close="closeForm"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item prop="nickname" label="富豪名称">
          <el-input v-model="addForm.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="worth" label="身价">
          <el-input v-model.number="addForm.worth"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="/api/console/form/upload_v2"
            :show-file-list="false"
            :on-change="handleChange"
          >
            <img v-if="addForm.avatar" :src="addForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRich">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { addRich } from "@/network/rich";
import SelectInput from "../select/SelectInput.vue"

@Component({
  components: {
    SelectInput
  }
})
export default class RichHeader extends Vue {
  private dialogVisible = false;
  private addForm: {
    nickname: string;
    worth: number;
    avatar: string;
  } = {
    nickname: "",
    worth: 0,
    avatar: "",
  };

  private addFormRules: {
    nickname: any[];
    worth: any[];
  } = {
    nickname: [{ required: true, message: "请输入名称", trigger: "blur" },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
    worth: [{ required: true, message: "请输入身价", trigger: "blur" },
      { type: 'number', message: '身价必须为数字', trigger: "blur"}],
  };

  public $refs!: {
    addForm: any;
  };

  public closeForm(): void {
    this.$refs.addForm.resetFields();
    this.addForm.avatar = "";
  }

  handleChange = (info: any) => {
    //循环执行，所以要判断，在加载中的话跳过
    if (info.status === "ready") {
      return;
    }
    if (info.status === "success") {
      let avatar = info.response.data.file;
      avatar = "http://localhost:3000" + avatar;
      this.addForm.avatar = avatar;
    }
  };

  public addRich(): void {
    this.$refs.addForm.validate((valid: boolean) => {
      if (valid) {
        addRich(this.addForm).then((res) => {
          this.$message.success("添加成功！");
          this.dialogVisible = false;
          this.$emit("refresh");
        });
      } else {
        this.$message.error("输入信息有误！");
      }
    });
  }

  public select(text:string): void {
    this.$emit("select", text);
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
