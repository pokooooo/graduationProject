const Router = require('koa-router')
const rich = require('./rich')
const goods = require('./goods')
const order = require('./order')
const user = require('./user')
const mail = require('./mail')
let _web = new Router()

_web.use('/rich', rich.routes(), rich.allowedMethods())
_web.use('/order', order.routes(), order.allowedMethods())
_web.use('/goods', goods.routes(), goods.allowedMethods())
_web.use('/user', user.routes(), user.allowedMethods())
_web.use('/mail', mail.routes(), mail.allowedMethods())

module.exports = _web
