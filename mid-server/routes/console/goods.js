const Router = require('koa-router')
const uuid = require('uuid')
const { searchGoods, hasOne } = require('../../kit/goods')
const { check, catchError, generateOk } = require('../../lib/check')
const {
  setGoods,
  editGoods,
  deleteGoods,
  getGoods,
} = require('../../model/goods')
const { hasToken } = require('../../model/token')
let goods = new Router()

goods.post('/search', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { pageIndex, pageSize, keyword } = ctx.request.body
    check(pageIndex >= 0, 'Params_Is_Not_In_Rules')
    check(pageSize >= 0, 'Params_Is_Not_In_Rules')
    let data = searchGoods(pageIndex, pageSize, keyword)
    ctx.body = generateOk({
      items: data[0],
      total: data[1],
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

goods.post('/add', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { title, price, cover, limit } = ctx.request.body
    check(!!title)
    check(price > 0)
    check(!!cover)
    check(limit >= 0)
    let id = uuid.v4()
    let ctime = new Date().getTime()
    let obj = {
      title,
      price: price ,
      cover,
      id,
      status: 0,
      limit,
      weight: 0,
      ctime,
    }
    setGoods(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

goods.post('/set', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id, title, price, cover, limit } = ctx.request.body
    check(hasOne(id))
    let goods = getGoods(id)
    let obj = {
      ...goods,
      title,
      price: price ,
      cover,
      limit,
    }
    editGoods(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

goods.post('/setweight', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id, weight } = ctx.request.body
    check(weight >= 0)
    check(hasOne(id))
    let goods = getGoods(id)
    let obj = {
      ...goods,
      weight,
    }
    editGoods(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

goods.post('/up', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id))
    let goods = getGoods(id)
    let obj = {
      ...goods,
      status: 1,
    }
    editGoods(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

goods.post('/down', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id))
    let goods = getGoods(id)
    let obj = {
      ...goods,
      status: 2,
    }
    editGoods(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

goods.post('/delete', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id))
    deleteGoods(id)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

module.exports = goods
