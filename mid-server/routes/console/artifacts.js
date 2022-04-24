const Router = require('koa-router')
const uuid = require('uuid')
const { searchArtifacts, hasOne } = require('../../kit/artifacts')
const { check, catchError, generateOk } = require('../../lib/check')
const {
    setArtifacts,
    editArtifacts,
    deleteArtifacts,
    getArtifacts,
} = require('../../model/artifacts')
const { hasToken } = require('../../model/token')
let artifacts = new Router()

artifacts.post('/search', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { pageIndex, pageSize, keyword } = ctx.request.body
        check(pageIndex >= 0, 'Params_Is_Not_In_Rules')
        check(pageSize >= 0, 'Params_Is_Not_In_Rules')
        let data = searchArtifacts(pageIndex, pageSize, keyword)
        ctx.body = generateOk({
            items: data[0],
            total: data[1],
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

artifacts.post('/add', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        let id = uuid.v4()
        data =  Object.assign(data,{
            id
        })
        setArtifacts(data )
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

artifacts.post('/set', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        check(hasOne(data.id))
        editArtifacts(data)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

artifacts.post('/delete', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        deleteArtifacts(id)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = artifacts
