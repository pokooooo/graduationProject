const Router = require('koa-router')
const uuid = require('uuid')
const { searchUsers } = require('../../kit/users')
const { check, catchError, generateOk } = require('../../lib/check')
const { hasToken } = require('../../model/token')

let users = new Router()

users.post('/search', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { pageIndex, pageSize, keyword, type } = ctx.request.body
    check(pageIndex >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    check(pageSize >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    let data = searchUsers(pageIndex, pageSize, keyword, type)
    ctx.body = generateOk({
      items: data[0],
      total: data[1],
    })
  } catch (err) {
    catchError(err, ctx)
  }
})


module.exports = users
