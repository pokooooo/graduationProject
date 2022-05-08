const Router = require('koa-router')
const uuid = require('uuid')
const { searchRoles, hasOne } = require('../../kit/roles')
const { check, catchError, generateOk } = require('../../lib/check')
const { setRole, editRole, deleteRole,getRole } = require('../../model/roles')
const { hasToken } = require('../../model/token')
const {editWeapons} = require("../../model/weapons");


let roles = new Router()

roles.post('/search', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { pageIndex, pageSize, keyword } = ctx.request.body
    check(pageIndex >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    check(pageSize >= 0, 'Params_Is_Not_In_Rules','查询参数有误')
    let data = searchRoles(pageIndex, pageSize, keyword)
    ctx.body = generateOk({
      items: data[0],
      total: data[1],
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

roles.post('/add', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let data = ctx.request.body
    let id = uuid.v4()
    let add = 0
    if(data.star === 5) {
      add = 6
    }
    if(data.vision === 'geo') add += 6
    if(data.vision === 'anemo') add += 5
    if(data.vision === 'cryo') add += 4
    if(data.vision === 'electro') add += 3
    if(data.vision === 'hydro') add += 2
    if(data.vision === 'pyro') add += 1
    data =  Object.assign(data,{
      id,
      status: 2,
      weight: add
    })
    setRole(data)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

roles.post('/set', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let data = ctx.request.body
    check(hasOne(data.id))
    editRole(data)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

roles.post('/setweight', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id, weight } = ctx.request.body
    check(weight >= 0)
    check(hasOne(id))
    let roles = getRole(id)
    let obj = {
      ...roles,
      weight,
    }
    editRole(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

roles.post('/up', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id))
    let roles = getRole(id)
    let obj = {
      ...roles,
      status: 1,
    }
    editRole(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

roles.post('/down', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id))
    let roles = getRole(id)
    let obj = {
      ...roles,
      status: 2,
    }
    editRole(obj)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

roles.post('/delete', async (ctx) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'Admin_Not_Login','管理员未登录')
    check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
    let { id } = ctx.request.body
    check(hasOne(id), 'Role_Not_Found')
    deleteRole(id)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

module.exports = roles
