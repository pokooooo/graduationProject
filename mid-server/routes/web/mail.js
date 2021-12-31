
const Router = require('koa-router')
const uuid = require('uuid')
const { catchError, check, generateOk } = require('../../lib/check')
const { setMail, getMail, editMail, hasMail,getMailByAccount } = require('../../model/mail')


let mail = new Router()

mail.post('/send', async (ctx) => {
  try {
    let data = ctx.request.body
    data.sendTime = new Date().getTime()
    data.receiver.forEach(receiver => {
      item = {...data}
      item.receiver = receiver
      item.id = uuid.v4()
      item.isRead = false
      item.isReceive = false
      setMail(item)
    })
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

mail.post('/get', async (ctx) => {
  try {
    let data = ctx.request.body
    getMailByAccount(data.account)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})


module.exports = mail