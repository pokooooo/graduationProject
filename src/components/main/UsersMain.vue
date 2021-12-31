<template>
  <div>
    <el-table @select="select" @select-all="selectAll" :data="usersList" border stripe>
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">
          <img class="avatar" :src="!!scope.row.avatar ? scope.row.avatar : imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column label="等级" prop="level"></el-table-column>
      <el-table-column label="上次登录时间">
        <template slot-scope="scope">
          {{scope.row.lastSign | dataFormat}}
        </template>
      </el-table-column>
      <el-table-column label="原石" prop="diamond"></el-table-column>
      <el-table-column label="摩拉" prop="gold"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-message"
            @click="set(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="发送给用户" :visible.sync="dialogVisible" width="30%" @close="closeForm">
      <el-form
        :model="mailForm"
        :rules="mailFormRules"
        ref="mailForm"
        label-width="80px"
      >
        <el-form-item prop="receiver" label="发送对象">
          <el-select v-model="mailForm.receiver" placeholder="请选择">
            <el-option label="所有用户" :value="allUsersList"></el-option>
            <el-option label="选中用户" :value="accountList.map(item => item.account)"></el-option>
            <el-option label="当前用户" :value="account"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="标题">
          <el-input v-model="mailForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="context" label="内容">
          <el-input type="textarea" v-model="mailForm.context"></el-input>
        </el-form-item>
        <el-form-item prop="gold" label="摩拉">
          <el-input v-model.number="mailForm.gold"></el-input>
        </el-form-item>
        <el-form-item prop="diamond" label="原石">
          <el-input v-model.number="mailForm.diamond"></el-input>
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


import {sendMail} from '../../network/mail'

export default {
  name: 'UsersMain',
  props: {
    usersList: {
      type: Array,
      default() {
        return []
      }
    },
    allUsersList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      imgUrl: require('../../assets/image/default.jpg'),
      dialogVisible: false,
      mailForm: {
        receiver: null,
        title: '',
        context: '',
        gold: 0,
        diamond: 0,
      },
      account: [],
      accountList: [],
      mailFormRules: {
        receiver: [{ required: true, message: "请选择发送的对象", trigger: "blur" }],
        title: [{ required: true, message: "请输入邮件标题", trigger: "blur" }],
        gold: [{ type: 'number', message: '数量必须为数字'}],
        diamond: [{ type: 'number', message: '数量必须为数字'}],
        },
    }
  },
  methods: {
  select(selection) {
    this.accountList = selection
  },
  selectAll(selection) {
    this.accountList = selection
  },
  closeForm() {
    this.$refs.mailForm.resetFields();
    this.mailForm.receiver = null
  },
  commitSet() {
    this.$refs.mailForm.validate((valid) => {
      if (valid) {
        sendMail({sender: window.sessionStorage.getItem("nickname"),...this.mailForm}).then(res => {
          this.$message.success("发送成功!");
          this.dialogVisible = false
          this.closeForm()
        })
      } else {

      }
    });
  },
  set(data) {
    this.account = [data.account]
    this.dialogVisible = true
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
