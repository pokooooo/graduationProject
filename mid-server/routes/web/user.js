
const Router = require('koa-router')
const { catchError, check, generateOk } = require('../../lib/check')
const { setUser, getUser, editUser, hasUser } = require('../../model/users')

let user = new Router()

user.post('/set', async (ctx) => {
  try {
    let data = ctx.request.body
    check(!!getUser(data.account),'Not_Find_Account','账号未注册！')
    editUser(data)
    ctx.body = generateOk({
      data: getUser(data.account)
    })
  } catch (err) {
    catchError(err, ctx)
  }
})


module.exports = user