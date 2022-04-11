
const Router = require('koa-router')
const uuid = require('uuid')
const { catchError, check, generateOk } = require('../../lib/check')
const { setChat, getChat, editChat, hasChat,getChatByAccount,getChatByAccount2, hasChatByAccount2 } = require('../../model/chat')
const {getMailByAccount} = require("../../model/mail");


let chat = new Router()

chat.post('/new', async (ctx) => {
    try {
        let data = ctx.request.body
        let {account1, account2 ,nickname1, nickname2, avatar1 , avatar2} = data
        if(!hasChatByAccount2(account1,account2)) {
            let d = {account1, account2, nickname1, nickname2, avatar1, avatar2, list: [], id: uuid.v4()}
            setChat(d)
            ctx.body = generateOk({
                data: d
            })
        } else {
            ctx.body = generateOk({
                data: getChatByAccount2(account1,account2)
            })
        }


    } catch (err) {
        catchError(err, ctx)
    }
})

chat.post('/get', async (ctx) => {
    try {
        let data = ctx.request.body
        let chat = getChatByAccount(data.account)
        if(data.to !== 'null') {
            chat.map((item,index) => {
                if(item.account1 === data.to || item.account2 === data.to) {
                    chat.splice(index,1)
                    chat.unshift(item)
                }
            })
        }
        ctx.body = generateOk({
            data:chat
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

chat.post('/send', async (ctx) => {
    try {
        let data = ctx.request.body
        editChat(getChat(data.id).list.push(data.content))
        ctx.body = generateOk({
            data: getChat(data.id)
        })
    } catch (err) {
        catchError(err, ctx)
    }
})



module.exports = chat