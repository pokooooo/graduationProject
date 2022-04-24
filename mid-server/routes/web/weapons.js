const Router = require('koa-router')
const { searchWeapons, hasOne } = require('../../kit/weapons')
const { catchError, check, generateOk } = require('../../lib/check')
const { getWeapons } = require('../../model/weapons')

let weapons = new Router()

weapons.post('/search', async (ctx) => {
    try {
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

weapons.post('/get', async (ctx) => {
    try {
        let { id } = ctx.request.body
        check(!!id)
        check(hasOne(id))
        let data = getWeapons(id)
        ctx.body = generateOk({
            info: data,
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = weapons
