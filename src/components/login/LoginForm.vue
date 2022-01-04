<template>
  <div class="login-form">
    <el-form v-if="!register" :model="loginForm" :rules="loginFormRules" ref="form">
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
              <div :class="item.username === 'admin' ? 'admin cursor' : 'cursor'" @click="input(item)">{{ item.username }}</div>
              <div class="cursor" @click="remove(item)"> <i class="iconfont icon-guanbi"></i> </div>
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
      <div class="register">
        <el-checkbox  v-model="isSave">保存密码</el-checkbox>
        <div class="cursor" @click="register = !register">没有账号？点我注册</div>
      </div>
      <el-form-item style="position: absolute; left: 20px; bottom: 5px">
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
      <el-form-item style="position: absolute; right: 20px; bottom: 5px">
        <el-button type="primary" @click="toLogin">登录</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="register" :model="registerForm" :rules="registerFormRules" ref="rform" >
      <el-form-item style="margin: 30px 20px 20px" prop="username">
        <el-input
          prefix-icon="el-icon-user"
          v-model="registerForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin: 0 20px" prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          v-model="registerForm.password"
          type="password"
        ></el-input>
      </el-form-item>
      <div class="register">
        <div class="cursor" @click="register = !register">返回登录</div>
      </div>
      <el-form-item style="position: absolute; left: 20px; bottom: 5px">
        <el-button type="info" @click="resetregisterForm">重置</el-button>
      </el-form-item>
      <el-form-item style="position: absolute; right: 20px; bottom: 5px">
        <el-button type="primary" @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { login,register } from "@/network/login";
import {getMailByAccount} from "@/network/mail"


export default  {
  name: 'LoginForm',
  data() {
    return {
      loginForm: {
      username: "",
      password: ""
      },
      registerForm: {
        username: "",
        password: ""
      },
      registerFormRules: {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    loginFormRules: {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    },
    isSave: true,
    userList: [],
    register: false
    }
  },
  methods: {
  resetLoginForm() {
    this.$refs.form.resetFields();
  },
  resetregisterForm() {
    this.$refs.rform.resetFields();
  },
  toRegister() {
    this.$refs.rform.validate((valid) => {
      if(valid) {
        register(this.registerForm.username, this.registerForm.password).then(res => {
          if (res.data.stat === "ok") {
          this.$message.success("注册成功，正在为您登录！")
          this.loginForm.username = res.data.data.account;
          this.loginForm.password = res.data.data.pwd;
          this.login(this.loginForm.username,this.loginForm.password);
          } else this.$message.error(res.data.msg);
        })
      }
    })
  },
  toLogin() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        this.login(this.loginForm.username,this.loginForm.password)
      } else {
        this.$message.error("请输入账户密码！");
      }
    });
  },
  login(username,password) {
        login(username, password).then((res) => {
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
            if(!!res.data.data.token) {
            window.sessionStorage.setItem("token", res.data.data.token);
            window.sessionStorage.setItem(
              "nickname",
              res.data.data.info.nickname
            );
            this.$router.replace("/admin");
            } else {
              this.$store.commit('updata',res.data.data.data)
              getMailByAccount({account: res.data.data.data.account}).then(res1 => {
                console.log(res1);
                this.$store.commit('updataMail',res1.data.data.data)
              })
              this.$router.push("/user");
            }

          } else this.$message.error(res.data.msg);
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

.register {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #409EFF
}

.admin {
    color: #409EFF
}

</style>
