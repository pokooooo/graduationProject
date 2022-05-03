const Router = require('koa-router')


const user = require('./user')
const mail = require('./mail')
const chat = require('./chat')
const store = require('./store')
const goods = require('./goods')
let _web = new Router()


_web.use('/user', user.routes(), user.allowedMethods())
_web.use('/mail', mail.routes(), mail.allowedMethods())
_web.use('/chat', chat.routes(), chat.allowedMethods())
_web.use('/store', store.routes(), store.allowedMethods())
_web.use('/goods', goods.routes(), goods.allowedMethods())

module.exports = _web
