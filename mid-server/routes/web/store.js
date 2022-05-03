
const Router = require('koa-router')
const { catchError, check, generateOk } = require('../../lib/check')
const { setUser, getUser, editUser, hasUser } = require('../../model/users')
const {addWeapon, addMaterial} = require("../../kit/users");

let store = new Router()

store.post('/buyWeapon', async (ctx) => {
    try {
        let {account,id,price} = ctx.request.body
        addWeapon(account,id)
        addMaterial(account,'1b3a5bab-7122-477a-b59c-56455cf48fba',-price)
        ctx.body = generateOk({

        })
    } catch (err) {
        catchError(err, ctx)
    }
})

store.post('/buyMaterial', async (ctx) => {
    try {
        let {account,id,price,num} = ctx.request.body
        addMaterial(account,id,num)
        addMaterial(account,'4c20a362-0bc0-4ddc-b7d1-4d9f75bf58e1',-price * num)
        ctx.body = generateOk({

        })
    } catch (err) {
        catchError(err, ctx)
    }
})

store.post('/buy', async (ctx) => {
    try {
        let {account,id,price,num} = ctx.request.body
        addMaterial(account,id,num)
        editUser(getUser(account).diamond += -price * num)
        ctx.body = generateOk({

        })
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = store