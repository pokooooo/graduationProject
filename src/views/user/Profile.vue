<template>
  <div style="margin-top: 20px">
      <el-form
        :model="setForm"
        :rules="setFormRules"
        ref="setForm"
        label-width="80px"
      >
        <el-form-item prop="nickname" label="昵称">
          <el-input style="width: 180px" v-model="setForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
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
        <el-form-item prop="pwd" label="密码">
          <el-input style="width: 180px"  show-password v-model="setForm.pwd"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="commit">修改</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>


export default {
  name: 'Profile',
  components: {
  },
  data() {
     return {
      setForm: {
        nickname: "",
        avatar: "",
        pwd: "",
        account: '',
      },
      setFormRules: {
        nickname: [{ required: true, message: "请输入名称", trigger: "blur" },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        },
     }
  },
  computed: {

  },
  methods: {
    updata() {
      this.setForm.nickname = this.$store.getters.getUserData.nickname;
      this.setForm.avatar = this.$store.getters.getUserData.avatar;
      this.setForm.pwd = this.$store.getters.getUserData.pwd;
      this.setForm.account = this.$store.getters.getUserData.account;
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
    commit() {
      this.$store.dispatch('updata',this.setForm).then(res => {
        this.$message.success("修改成功!");
        this.updata();
      })
    }
  },
  created() {
    this.updata()
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
