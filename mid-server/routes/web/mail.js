
const Router = require('koa-router')
const uuid = require('uuid')
const { catchError, check, generateOk } = require('../../lib/check')
const { setMail, getMail, editMail, hasMail,getMailByAccount,deleteMail } = require('../../model/mail')
const { getUser, editUser} = require('../../model/users')
const {addMaterial} = require('../../kit/users')



let mail = new Router()

mail.post('/send', async (ctx) => {
  try {
    let data = ctx.request.body
    data.sendTime = new Date().getTime()
    data.receiver.forEach(receiver => {
      let item = {...data}
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
    ctx.body = generateOk({
      data: getMailByAccount(data.account)
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

mail.post('/read', async (ctx) => {
  try {
    let data = ctx.request.body
    let mail = getMail(data.id)
    mail.isRead = true
    editMail(mail)
    ctx.body = generateOk({
      data: mail
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

mail.post('/receive', async (ctx) => {
  try {
    let data = ctx.request.body
    let mail = getMail(data.id)
    mail.isReceive = true
    editMail(mail)
    let user = getUser(mail.receiver)
    user.diamond += mail.diamond
    user.gold += mail.gold
    editUser(user)
    mail.materialsList.map(item => {
      delete item.status
      addMaterial(user.account, item.id, item.num)
    })
    ctx.body = generateOk({
      data: mail
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

mail.post('/delete', async (ctx) => {
  try {
    let data = ctx.request.body
    deleteMail(data.id)
    ctx.body = generateOk({

    })
  } catch (err) {
    catchError(err, ctx)
  }
})


module.exports = mail