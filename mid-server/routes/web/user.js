
const Router = require('koa-router')
const { catchError, check, generateOk } = require('../../lib/check')
const { setUser, getUser, editUser, hasUser } = require('../../model/users')

let user = new Router()

user.post('/get', async (ctx) => {
  try {
    let data = ctx.request.body
    check(!!getUser(data.account),'Not_Find_Account','账号未注册！')
    ctx.body = generateOk({
      data: getUser(data.account)
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

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

user.post('/friendRequest', async (ctx) => {
  try {
    let data = ctx.request.body
    check(!!getUser(data.receiver),'Not_Find_Account','找不到该账号！')
    getUser(data.sender).friends.map(item => {
      if(item.account === data.receiver)
        check(false,'Not_Find_Account','不要重复添加！')
    })
    let t = true
    getUser(data.receiver).friends.map(item => {
      if(item.account === data.sender) {
        editUser(getUser(data.sender).friends.push({account: data.receiver, twoWay: true}))
        editUser(getUser(data.receiver).friends.map(item => {
          if(item.account === data.sender)
            item.twoWay = true
        }))
        t = false
        ctx.body = generateOk({
          data: getUser(data.sender),
          msg: `已与${data.receiver}成为双向好友!`
        })
      }
    })
    if(t) {
      editUser(getUser(data.sender).friends.push({account: data.receiver, twoWay: false}))
      editUser(getUser(data.receiver).friendRequest.push(data.sender))
      ctx.body = generateOk({
        data: getUser(data.sender),
        msg: '"好友申请已发送!"'
      })
    }

  } catch (err) {
    catchError(err, ctx)
  }
})

user.post('/friendAccepted', async (ctx) => {
  try {
    let data = ctx.request.body
    if(data.isAccepted) {
      editUser(getUser(data.receiver).friends.push({account: data.sender, twoWay: true}))
      editUser(
          getUser(data.sender).friends.map(item => {
            if(item.account === data.receiver)
              item.twoWay = true
          })
      )
    }
    editUser(getUser(data.receiver).friendRequest.pop())

    ctx.body = generateOk({
      data: getUser(data.receiver)
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

user.post('/getFriendData', async (ctx) => {
  try {
    let data = ctx.request.body.data
    data.map(item => {
      // if(item.twoWay) {
        let {level,nickname,avatar,lastSign,isOnline} = getUser(item.account)
        Object.assign(item,{level,nickname,avatar,lastSign,isOnline})
      // }
    })
    ctx.body = generateOk({
      data: data
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

user.post('/deleteFriend', async (ctx) => {
  try {
    let data = ctx.request.body
    let sender = getUser(data.sender)
    sender.friends = sender.friends.filter(item => item.account !== data.account)
    editUser(sender)
    let account = getUser(data.account)
    account.friends.map(item => {
      if(item.account === data.sender) {
        item.twoWay = false
      }
    })
    editUser(account)
    ctx.body = generateOk({
      data: sender
    })
  } catch (err) {
    catchError(err, ctx)
  }
})


module.exports = user