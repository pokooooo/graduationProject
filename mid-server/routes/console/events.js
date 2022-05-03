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
const {getAllWeapons, getWeapons,Weapons,setWeapons1} = require("../../model/weapons");
const {getUser, editUser} = require("../../model/users");
const {getMaterials} = require("../../model/materials");
const {addMaterial, addWeapon ,addRole} = require('../../kit/users')
const {logger} = require("sequelize/lib/utils/logger");
const {getRole, roles} = require("../../model/roles");

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



events.post('/draw', async (ctx) => {
    try {

        let { account, id, num } = ctx.request.body

        let user = getUser(account)
        let event = getEvents(id)


        let xingchenNum = 0
        let xinghuiNum = 0
        let list = []
        if(event.type === 'weapon') {
            let weaponList5 = Weapons.filter(item => item.star === 5 && item.status === 1)
            let weaponList4 = Weapons.filter(item => item.star === 4)
            let {weaponEvent} = user
            for(let i = 0; i < num; i++) {
                let p1 = 2
                if(weaponEvent.big > 40) {
                    p1 += (weaponEvent.big - 40) * 10
                }
                let r1 = Math.random() * 100
                if(r1 <= p1) {
                    let p2 = 75
                    if(Math.random() * 100 < p2 || weaponEvent.buff) {
                        list.push(addWeapon(user.account,event.star5[Math.floor(Math.random() * event.star5.length)].id))
                        weaponEvent.buff = false
                    } else {
                        list.push(addWeapon(user.account,weaponList5[Math.floor(Math.random() * weaponList5.length)].id))
                        weaponEvent.buff = true
                    }
                    let {name,star} = list[list.length - 1]
                    weaponEvent.history.push({
                        name,
                        star,
                        time: new Date().getTime(),
                        num: weaponEvent.big + 1
                    })
                    if(weaponEvent.history.length === 11) weaponEvent.history.shift()
                    xinghuiNum += 10
                    weaponEvent.big = 0
                    if(weaponEvent.small !== 9) weaponEvent.big++
                } else if(r1 <= 10 || weaponEvent.small === 9) {
                    let p3 = 75
                    if(Math.random() * 100 < p3) {

                        list.push(addWeapon(user.account,event.star4[Math.floor(Math.random() * event.star4.length)].id))
                    } else {
                        list.push(addWeapon(user.account,weaponList4[Math.floor(Math.random() * weaponList4.length)].id))
                    }
                    let {name,star} = list[list.length - 1]
                    weaponEvent.history.push({
                        name,
                        star,
                        time: new Date().getTime(),
                        num: weaponEvent.small + 1
                    })
                    if(weaponEvent.history.length === 11) weaponEvent.history.shift()
                    xinghuiNum += 2
                    weaponEvent.small = 0
                    weaponEvent.big += 1
                } else {
                    xingchenNum += 15
                    weaponEvent.big++
                    weaponEvent.small++
                    list.push({
                        name: '无主的星尘',
                        num: 15,
                        cover: 'http://localhost:3000/images/06e9918d-6b20-4f59-b793-a4093cbed47a.png'
                    })
                }

            }
            user = getUser(user.account)
            user.weaponEvent = weaponEvent
            editUser(user)
            addMaterial(user.account,'4c20a362-0bc0-4ddc-b7d1-4d9f75bf58e1',xingchenNum)
            addMaterial(user.account,'1b3a5bab-7122-477a-b59c-56455cf48fba',xinghuiNum)
            addMaterial(user.account,'e2e2bcb6-3bed-4034-8d62-7547139271c5',-num)
        } else {
            let roleList5 = roles.filter(item => item.star === 5 && item.status === 1)
            let roleList4 = roles.filter(item => item.star === 4)
            let {roleEvent} = user
            for(let i = 0; i < num; i++) {
                let p1 = 2
                if(roleEvent.big > 40) {
                    p1 += (roleEvent.big - 40) * 10
                }
                let r1 = Math.random() * 100
                if(r1 <= p1) {
                    let p2 = 50
                    if(Math.random() * 100 < p2 || roleEvent.buff) {
                        list.push(addRole(user.account,event.star5[Math.floor(Math.random() * event.star5.length)].id))
                        roleEvent.buff = false
                    } else {
                        list.push(addRole(user.account,roleList5[Math.floor(Math.random() * roleList5.length)].id))
                        roleEvent.buff = true
                    }
                    let {name,star} = list[list.length - 1]
                    if(name !== '无主的星辉') {
                        roleEvent.history.push({
                            name,
                            star,
                            time: new Date().getTime(),
                            num: roleEvent.big + 1
                        })
                    }
                    if(roleEvent.history.length === 11) roleEvent.history.shift()
                    xinghuiNum += 10
                    roleEvent.big = 0
                    if(roleEvent.small !== 9) roleEvent.big++
                } else if(r1 <= 10 || roleEvent.small === 9) {
                    let p3 = 50
                    if(Math.random() * 100 < p3) {
                        list.push(addRole(user.account,event.star4[Math.floor(Math.random() * event.star4.length)].id))
                    } else {
                        list.push(addRole(user.account,roleList4[Math.floor(Math.random() * roleList4.length)].id))
                    }
                    let {name,star} = list[list.length - 1]
                    if(name !== '无主的星辉') {
                        roleEvent.history.push({
                            name,
                            star,
                            time: new Date().getTime(),
                            num: roleEvent.small + 1
                        })
                    }
                    if(roleEvent.history.length === 11) roleEvent.history.shift()
                    xinghuiNum += 2
                    roleEvent.small = 0
                    roleEvent.big += 1
                } else {
                    xingchenNum += 15
                    roleEvent.big++
                    roleEvent.small++
                    list.push({
                        name: '无主的星尘',
                        num: 15,
                        cover: 'http://localhost:3000/images/06e9918d-6b20-4f59-b793-a4093cbed47a.png'
                    })
                }

            }
            user = getUser(user.account)
            user.roleEvent = roleEvent
            editUser(user)
            list.map(item => {
                if(item.name === '无主的星辉') xinghuiNum += item.num
            })
            addMaterial(user.account,'4c20a362-0bc0-4ddc-b7d1-4d9f75bf58e1',xingchenNum)
            addMaterial(user.account,'1b3a5bab-7122-477a-b59c-56455cf48fba',xinghuiNum)
            addMaterial(user.account,'e2e2bcb6-3bed-4034-8d62-7547139271c5',-num)
        }
        ctx.body = generateOk({
            items: list,
            x: xinghuiNum,
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
        let weight = 2
        UP.map(item => {
            let d =  getRole(item)
            if(type === 'weapon') {
                d =  getWeapons(item)
                weight = 1
            }
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
            weight,
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
