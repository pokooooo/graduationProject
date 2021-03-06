const Router = require('koa-router')
const uuid = require('uuid')
const moment = require('moment')
const { check, catchError, generateOk } = require('../../lib/check')
const admin = require('../../model/admin')
const { setUser, getUser, editUser, hasUser } = require('../../model/users')
const { writeToken, hasToken, removeToken } = require('../../model/token')
let auth = new Router()

auth.post('/login', async (ctx) => {
  try {
    let {account,pwd} = ctx.request.body
    check(!!account)
    check(!!pwd)
    if(account === admin.account) {
      check(pwd === admin.pwd,'Password_Error','密码错误')
      let token = uuid.v4()
      // 记录token
      writeToken(token)
      // 写入头部
      ctx.cookies.set('token', token, {
        maxAge: 10 * 60 * 10000, // cookie有效时长
        expires: new Date('2023-02-15'), // cookie失效时间
        httpOnly: true, // 是否只用于http请求中获取
        overwrite: false, // 是否允许重写
      })
      ctx.body = generateOk({
        token,
        info: {
          nickname: 'PAIMON',
        },
      })
    } else {
      check(!hasUser(account),'Account_Not_Found','账号不存在')
      let data = getUser(account);
      check(pwd === data.pwd,'Password_Error','密码错误')
      if(new Date().toDateString() !== new Date(data.lastSign).toDateString()) {
        if(!data.isSign || new Date().getTime() - data.lastSign > 1000 * 60 * 60 * 24 ) data.signDay = 0
        data.isSign = false
      }
      data.lastSign = new Date().getTime()
      data.isOnline = true
      editUser(data)
      ctx.body = generateOk({
        data
      })
    }

  } catch (err) {
    catchError(err, ctx)
  }
})

auth.post('/register', async (ctx) => {
  try {
    let {account,pwd} = ctx.request.body
    check(!!account)
    check(!!pwd)
    check(hasUser(account), 'Account_Already_Existed','账号已存在')
    let obj = {
      account,
      pwd,
      level: 1,
      experience: 0,
      resin: 0,
      nickname: '',
      avatar: '',
      diamond: 0,
      gold: 0,
      isSign: false,
      lastSign: 0,
      signDay: 0,
      friends: [],
      friendRequest: [],
      isOnline: false,
      inventory: {
        weapons: [],
        artifacts: [],
        materials: []
      },
      weaponEvent: [],
      roleEvent: []
    }
    setUser(obj)
    ctx.body = generateOk({
      account,
      pwd
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

// auth.post('/getUserInfo', async (ctx) => {
//   try {
//     // 解析header中的token
//     let token = ctx.cookies.get("token") 
//     check(!!token, 'User_Not_Login')
//     check(hasToken(token), 'User_Login_Outdate')
//     ctx.body = generateOk({
//       nickname: 'admin',
//     })
//   } catch (err) {
//     catchError(err, ctx)
//   }
// })

auth.post('/logout', async (ctx) => {
  try {
    // 解析header中的token
    let token = ctx.cookies.get("token")
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    removeToken(token)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

module.exports = auth
