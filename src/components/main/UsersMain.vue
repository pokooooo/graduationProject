<template>
  <div>
    <el-table :data="usersList" border stripe>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="头像">
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
            icon="el-icon-present"
            @click="set(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="赠送" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="moneyForm"
        :rules="moneyFormRules"
        ref="moneyForm"
        label-width="80px"
      >
        <el-form-item prop="gold" label="摩拉">
          <el-input v-model.number="moneyForm.gold"></el-input>
        </el-form-item>
        <el-form-item prop="diamond" label="原石">
          <el-input v-model.number="moneyForm.diamond"></el-input>
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




export default {
  name: 'UsersMain',
  props: {
    usersList: {
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
      moneyForm: {
        account: 0,
        gold: 0,
        diamond: 0
      },
      moneyFormRules: {
        gold: [{ required: true, message: "请输入摩拉数额", trigger: "blur" },
        { type: 'number', message: '数量必须为数字'}],
        diamond: [{ required: true, message: "请输入原石数额", trigger: "blur" },
        { type: 'number', message: '数量必须为数字'}],
        },
    }
  },
  methods: {
  commitSet() {
    this.$refs.moneyForm.validate((valid) => {
      if (valid) {

      } else {

      }
    });
  },
  set(data) {
    this.moneyForm.account = data.account
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
