<template>
  <div>
    <el-table :data="richList" border stripe>
      <el-table-column label="富豪名称" prop="nickname"></el-table-column>
      <el-table-column label="身价" prop="worth"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img
            v-if="scope.row.avatar"
            :src="scope.row.avatar"
            alt=""
            class="avatar"
          />
          <img
            v-else
            src="../../assets/image/default.jpg"
            alt=""
            class="avatar"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="set(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="remove(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑富豪" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="setForm"
        :rules="setFormRules"
        ref="setForm"
        label-width="80px"
      >
        <el-form-item prop="nickname" label="富豪名称">
          <el-input v-model="setForm.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="worth" label="身价">
          <el-input v-model.number="setForm.worth"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="/api/console/form/upload_v2"
            :show-file-list="false"
            :on-change="handleChange"
          >
            <img v-if="setForm.avatar" :src="setForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitSet">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { deleteRich, setRich } from "@/network/rich";


export default {
  name: 'RichMain',
  props: {
    richList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      setForm: {
        nickname: "",
        worth: 0,
        avatar: "",
        id: "",
      },
      setFormRules: {
        nickname: [{ required: true, message: "请输入名称", trigger: "blur" },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        worth: [{ required: true, message: "请输入身价", trigger: "blur" },
        { type: 'number', message: '身价必须为数字'}],
        },
    }
  },
  methods: {
  set(item) {
    this.dialogVisible = true;
    this.setForm.id = item.id;
    this.setForm.nickname = item.nickname;
    this.setForm.worth = item.worth;
    this.setForm.avatar = item.avatar;
  },
  handleChange(info) {
    if (info.status === "ready") {
      return;
    }
    if (info.status === "success") {
      let avatar = info.response.data.file;
      avatar = "http://localhost:3000" + avatar;
      this.setForm.avatar = avatar;
    }
  },
  commitSet() {
    this.$refs.setForm.validate((valid) => {
      if (valid) {
        setRich(this.setForm).then((res) => {
          this.dialogVisible = false;
          this.$emit("refresh");
          this.$message.success("编辑成功!");
        });
      } else {
        this.$message.error("输入信息有误！");
      }
    });
  },
  remove(id) {
    this.$confirm("是否删除该富豪?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        deleteRich(id).then((res) => {
          this.$message.success("删除成功!");
          this.$emit("refresh");
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }
  }

}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
