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
      <el-table-column label="是否在线">
        <template slot-scope="scope">
          {{scope.row.isOnline ? '在线' : '离线'}}
        </template>
      </el-table-column>
      <el-table-column label="上次登录时间">
        <template slot-scope="scope">
          {{scope.row.lastSign | dataFormat}}
        </template>
      </el-table-column>
      <el-table-column label="结晶" prop="diamond"></el-table-column>
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
        <el-form-item prop="diamond" label="结晶">
          <el-input v-model.number="mailForm.diamond"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <img style="width: 80px" v-for="item in mailForm.materialsList" :key="item.id" :src="item.cover">
            <i @click="dialogVisible1 = true" class="el-icon-plus cover-uploader-icon"></i>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitSet">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择发送" :visible.sync="dialogVisible1" width="30%" @close="closeForm">
      <el-select  v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-input style="margin-top: 10px" v-model.number="num"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addMaterial">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>


import {sendMail} from '../../../network/mail'
import {selectMaterial} from "@/network/materials";

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
      imgUrl: require('../../../assets/image/default.jpg'),
      dialogVisible: false,
      dialogVisible1: false,
      value: 0,
      num: 0,
      options: [],
      materialsList: [],
      mailForm: {
        receiver: null,
        title: '',
        context: '',
        materialsList: [],
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

  },
  commitSet() {
    this.$refs.mailForm.validate((valid) => {
      if (valid) {
        sendMail({sender: window.sessionStorage.getItem("nickname"),...this.mailForm}).then(res => {
          this.$message.success("发送成功!");
          this.dialogVisible = false
          this.$refs.mailForm.resetFields();
          this.mailForm.receiver = null
          this.mailForm.materialsList = []
        })
      } else {

      }
    });
  },
  set(data) {
    this.account = [data.account]
    this.dialogVisible = true
  },
    addMaterial() {
    let data = this.materialsList[this.value]
      data.num = this.num
      this.mailForm.materialsList.push(data)
      this.num = 0
      this.dialogVisible1 = false
    },

  },
  created() {
    selectMaterial({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.materialsList = res.data.data.items
      this.materialsList.map((item,index) => {
        this.options.push({
          label: item.name,
          value: index
        })
      })

    });
  }

}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.cover {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
