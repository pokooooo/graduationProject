const Router = require('koa-router')
const auth = require('./auth')
const rich = require('./rich')
// const order = require('./order')
const form = require('./form')
const users = require('./users')
const artifacts = require('./artifacts')
const domains = require('./domains')
const enemies = require('./enemies')
const events = require('./events')
const materials = require('./materials')
const weapons = require('./weapons')
let _console = new Router()

_console.use('/auth', auth.routes(), auth.allowedMethods())
_console.use('/rich', rich.routes(), rich.allowedMethods())
// _console.use('/order', order.routes(), order.allowedMethods())
_console.use('/form', form.routes(), form.allowedMethods())
_console.use('/users', users.routes(), form.allowedMethods())
_console.use('/artifacts', artifacts.routes(), form.allowedMethods())
_console.use('/domains', domains.routes(), form.allowedMethods())
_console.use('/enemies', enemies.routes(), form.allowedMethods())
_console.use('/events', events.routes(), form.allowedMethods())
_console.use('/materials', materials.routes(), form.allowedMethods())
_console.use('/weapons', weapons.routes(), form.allowedMethods())

module.exports = _console
