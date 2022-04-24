const Router = require('koa-router')
const uuid = require('uuid')
const { searchEvents, hasOne } = require('../../kit/events')
const { check, catchError, generateOk } = require('../../lib/check')
const {
    setEvents,
    editEvents,
    deleteEvents,
    getEvents,
} = require('../../model/events')
const { hasToken } = require('../../model/token')
const {getAllWeapons, getWeapons} = require("../../model/weapons");

let events = new Router()

events.post('/search', async (ctx) => {
    try {
        let { pageIndex, pageSize, keyword } = ctx.request.body
        check(pageIndex >= 0, 'Params_Is_Not_In_Rules')
        check(pageSize >= 0, 'Params_Is_Not_In_Rules')
        let data = searchEvents(pageIndex, pageSize, keyword)
        ctx.body = generateOk({
            items: data[0],
            total: data[1],
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

events.post('/search', async (ctx) => {
    try {
        let { account, id, num } = ctx.request.body
        for(let i = 0; i < num; i++) {

        }
        let data = searchEvents(pageIndex, pageSize, keyword)
        ctx.body = generateOk({
            items: data[0],
            total: data[1],
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

events.post('/add', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let {name, UP, type, cover, time} = ctx.request.body
        let id = uuid.v4()
        let star4 = []
        let star5 = []
        UP.map(item => {
           let d =  getWeapons(item)
            if(d.star === 5) {
                star5.push({
                    id: item,
                    name: d.name,
                    cover: d.cover
                })
            } else {
                star4.push({
                    id: item,
                    name: d.name,
                    cover: d.cover
                })
            }

        })
        setEvents({
            name,
            type,
            cover,
            time,
            star5,
            star4,
            status: 2,
            id
        })
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

events.post('/set', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let data = ctx.request.body
        check(hasOne(data.id))
        editEvents(data)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

events.post('/setweight', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id, weight } = ctx.request.body
        check(weight >= 0)
        check(hasOne(id))
        let events = getEvents(id)
        let obj = {
            ...events,
            weight,
        }
        editEvents(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

events.post('/up', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        let events = getEvents(id)
        let obj = {
            ...events,
            status: 1,
        }
        editEvents(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

events.post('/down', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        let events = getEvents(id)
        let obj = {
            ...events,
            status: 2,
        }
        editEvents(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

events.post('/delete', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','管理员未登录')
        check(hasToken(token), 'Admin_Login_Outdate', '管理员登录过期')
        let { id } = ctx.request.body
        check(hasOne(id))
        deleteEvents(id)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = events
