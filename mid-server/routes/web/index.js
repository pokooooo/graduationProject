const Router = require('koa-router')
const rich = require('./rich')
// const order = require('./order')
const user = require('./user')
const mail = require('./mail')
const chat = require('./chat')
let _web = new Router()

_web.use('/rich', rich.routes(), rich.allowedMethods())
// _web.use('/order', order.routes(), order.allowedMethods())
_web.use('/user', user.routes(), user.allowedMethods())
_web.use('/mail', mail.routes(), mail.allowedMethods())
_web.use('/chat', chat.routes(), chat.allowedMethods())

module.exports = _web
