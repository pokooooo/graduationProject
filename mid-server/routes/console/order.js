const Router = require('koa-router')
const { searchOrder, hasOne } = require('../../kit/order')
const { check, catchError, generateOk } = require('../../lib/check')
const { getOrder } = require('../../model/order')
const { hasToken } = require('../../model/token')
let order = new Router()

order.post('/search', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { pageIndex, pageSize, keyword } = ctx.request.body
    check(pageIndex >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    check(pageSize >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    let data = searchOrder(pageIndex, pageSize, keyword)
    ctx.body = generateOk({
      items: data[0],
      total: data[1],
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

order.post('/get', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id))
    let data = getOrder(id)
    ctx.body = generateOk({ info: data })
  } catch (err) {
    catchError(err, ctx)
  }
})

module.exports = order
