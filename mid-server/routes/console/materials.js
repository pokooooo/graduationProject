const Router = require('koa-router')
const uuid = require('uuid')
const { searchMaterials, hasOne } = require('../../kit/materials')
const { check, catchError, generateOk } = require('../../lib/check')
const {
    setMaterials,
    editMaterials,
    deleteMaterials,
    getMaterials,
} = require('../../model/materials')
const { hasToken } = require('../../model/token')
let materials = new Router()

materials.post('/search', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { pageIndex, pageSize, keyword } = ctx.request.body
        check(pageIndex >= 0, 'Params_Is_Not_In_Rules')
        check(pageSize >= 0, 'Params_Is_Not_In_Rules')
        let data = searchMaterials(pageIndex, pageSize, keyword)
        ctx.body = generateOk({
            items: data[0],
            total: data[1],
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

materials.post('/add', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        let id = uuid.v4()
        data =  Object.assign(data,{
            id,
            status: 2,
            weight: 1,
        })
        setMaterials(data )
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

materials.post('/set', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        check(hasOne(data.id))
        editMaterials(data)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

materials.post('/setweight', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id, weight } = ctx.request.body
        check(weight >= 0)
        check(hasOne(id))
        let materials = getMaterials(id)
        let obj = {
            ...materials,
            weight,
        }
        editMaterials(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

materials.post('/up', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        let materials = getMaterials(id)
        let obj = {
            ...materials,
            status: 1,
        }
        editMaterials(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

materials.post('/down', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        let materials = getMaterials(id)
        let obj = {
            ...materials,
            status: 2,
        }
        editMaterials(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

materials.post('/delete', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        deleteMaterials(id)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = materials
