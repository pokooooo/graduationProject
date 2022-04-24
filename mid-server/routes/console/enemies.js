const Router = require('koa-router')
const uuid = require('uuid')
const { searchEnemies, hasOne } = require('../../kit/enemies')
const { check, catchError, generateOk } = require('../../lib/check')
const {
    setEnemies,
    editEnemies,
    deleteEnemies,
    getEnemies,
} = require('../../model/enemies')
const { hasToken } = require('../../model/token')
let enemies = new Router()

enemies.post('/search', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { pageIndex, pageSize, keyword } = ctx.request.body
        check(pageIndex >= 0, 'Params_Is_Not_In_Rules')
        check(pageSize >= 0, 'Params_Is_Not_In_Rules')
        let data = searchEnemies(pageIndex, pageSize, keyword)
        ctx.body = generateOk({
            items: data[0],
            total: data[1],
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

enemies.post('/add', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        let id = uuid.v4()
        data =  Object.assign(data,{
            id
        })
        setEnemies(data )
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

enemies.post('/set', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        check(hasOne(data.id))
        editEnemies(data)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})


enemies.post('/delete', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        deleteEnemies(id)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = enemies
