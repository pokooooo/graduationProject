const Router = require('koa-router')
const uuid = require('uuid')
const { searchRich, hasOne } = require('../../kit/rich')
const { check, catchError, generateOk } = require('../../lib/check')
const { setRich, editRich, deleteRich } = require('../../model/rich')
const { hasToken } = require('../../model/token')
let rich = new Router()

rich.post('/search', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { pageIndex, pageSize, keyword } = ctx.request.body
    check(pageIndex >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    check(pageSize >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    let data = searchRich(pageIndex, pageSize, keyword)
    ctx.body = generateOk({
      items: data[0],
      total: data[1],
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

rich.post('/add', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { nickname, worth, avatar } = ctx.request.body
    let id = uuid.v4()
    let obj = {
      nickname,
      worth: worth ,
      avatar,
      id,
      status: 0,
    }
    setRich(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

rich.post('/set', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id, nickname, worth, avatar } = ctx.request.body
    check(hasOne(id), 'Richer_Not_Found')
    let obj = {
      nickname,
      worth: worth ,
      avatar,
      id,
      status: 0,
    }
    editRich(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

rich.post('/delete', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id), 'Richer_Not_Found')
    deleteRich(id)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

module.exports = rich
