<template>
  <div class="login-form">
    <el-form :model="loginForm" :rules="loginFormRules" ref="form">
      <el-form-item style="margin: 30px 20px 20px" prop="username">
        <el-popover
          v-if="userList.length !== 0"
          placement="top-start"
          trigger="hover"
        >
          <div>
            <div
              v-for="item in userList"
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 16px;
              "
              :key="item.username"
            >
              <div class="cursor" @click="input(item)">{{ item.username }}</div>
              <div class="cursor" @click="remove(item)">x</div>
            </div>
          </div>
          <el-input
            slot="reference"
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-popover>
        <el-input
          v-else
          prefix-icon="el-icon-user"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin: 0 20px" prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-checkbox style="margin: 20px" v-model="isSave">保存密码</el-checkbox>
      <el-form-item style="position: absolute; left: 20px; bottom: 5px">
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
      <el-form-item style="position: absolute; right: 20px; bottom: 5px">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { login } from "@/network/login";


export default  {
  name: 'LoginForm',
  data() {
    return {
      loginForm: {
      username: "",
      password: "",
      
    },
    loginFormRules: {
      
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    },
    isSave: true,
    userList: []
    }
  },
  methods: {
  resetLoginForm() {
    this.$refs.form.resetFields();
  },
  login() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        login(this.loginForm.username, this.loginForm.password).then((res) => {
          if (res.data.stat === "ok") {
            this.$message.success("登录成功！");
            if (this.isSave) {
              let list = window.localStorage.getItem("userList");
              if (list === null) {
                window.localStorage.setItem(
                  "userList",
                  JSON.stringify([
                    {
                      username: this.loginForm.username,
                      password: this.loginForm.password,
                    },
                  ])
                );
              } else {
                let userList = JSON.parse(list);
                let isSame = false;
                for (let index in userList) {
                  if (userList[index].username === this.loginForm.username) {
                    userList[index].password = this.loginForm.password;
                    isSame = true;
                  }
                }
                if (!isSame) {
                  userList.push({
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                  });
                }
                this.userList = userList;
                window.localStorage.setItem(
                  "userList",
                  JSON.stringify(userList)
                );
              }
            }
            window.sessionStorage.setItem("token", res.data.data.token);
            window.sessionStorage.setItem(
              "nickname",
              res.data.data.info.nickname
            );
            this.$router.replace("/home");
          } else this.$message.error("账户或密码错误！");
        });
      } else {
        this.$message.error("请输入账户密码！");
      }
    });
  },
  input(item) {
    this.loginForm.username = item.username;
    this.loginForm.password = item.password;
  },
  remove(item) {
    for (let index in this.userList) {
      if (this.userList[index] === item) {
        this.userList.splice(parseInt(index), 1);
      }
    }
    window.localStorage.setItem("userList", JSON.stringify(this.userList));
  },
  },
  created() {
    let list = window.localStorage.getItem("userList");
    if (list !== null) {
      this.userList = JSON.parse(list);
    }
  }
}
</script>

<style scoped>
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 245px;
  width: 300px;
  background-color: #fff;
  border-radius: 20px;
}

.cursor:hover {
  cursor: pointer;
}
</style>
