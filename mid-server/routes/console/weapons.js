const Router = require('koa-router')
const uuid = require('uuid')
const { searchWeapons, hasOne } = require('../../kit/weapons')
const { check, catchError, generateOk } = require('../../lib/check')
const {
    setWeapons,
    editWeapons,
    deleteWeapons,
    getWeapons,
} = require('../../model/weapons')
const { hasToken } = require('../../model/token')
let weapons = new Router()

weapons.post('/search', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { pageIndex, pageSize, keyword } = ctx.request.body
        check(pageIndex >= 0, 'Params_Is_Not_In_Rules')
        check(pageSize >= 0, 'Params_Is_Not_In_Rules')
        let data = searchWeapons(pageIndex, pageSize, keyword)
        ctx.body = generateOk({
            items: data[0],
            total: data[1],
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

weapons.post('/add', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        let id = uuid.v4()
        data =  Object.assign(data,{
            id,
            status: 2,
            weight: data.star,
            level: 1,
            rank: 1
        })
        setWeapons(data )
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

weapons.post('/set', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        check(hasOne(data.id))
        editWeapons(data)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

weapons.post('/setweight', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id, weight } = ctx.request.body
        check(weight >= 0)
        check(hasOne(id))
        let weapons = getWeapons(id)
        let obj = {
            ...weapons,
            weight,
        }
        editWeapons(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

weapons.post('/up', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        let weapons = getWeapons(id)
        let obj = {
            ...weapons,
            status: 1,
        }
        editWeapons(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

weapons.post('/down', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        let weapons = getWeapons(id)
        let obj = {
            ...weapons,
            status: 2,
        }
        editWeapons(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

weapons.post('/delete', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        deleteWeapons(id)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = weapons
