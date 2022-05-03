
const Router = require('koa-router')
const { catchError, check, generateOk } = require('../../lib/check')
const { setUser, getUser, editUser, hasUser } = require('../../model/users')

let user = new Router()

let levelList = [
  '375',    '500',    '625',    '725',    '850',
  '950',    '1075',   '1200',   '1300',   '1425',
  '1525',   '1650',   '1775',   '1875',   '2000',
  '2375',   '2500',   '2625',   '2775',   '2825',
  '3425',   '3725',   '4000',   '4300',   '4575',
  '4875',   '5150',   '5450',   '5725',   '6025',
  '6300',   '6600',   '6900',   '7175',   '7475',
  '7750',   '8050',   '8325',   '8625',   '10550',
  '11525',  '12375',  '13450',  '14400',  '15350',
  '16325',  '17275',  '18250',  '19200',  '26400',
  '28800',  '31200',  '33600',  '36000',  '232350',
  '258950', '285750', '312825', '340125'
]


user.post('/logout', async (ctx) => {
  try {
    let data = ctx.request.body
    check(!!getUser(data.account),'Not_Find_Account','账号未注册！')
    ctx.body = generateOk({
      data: editUser(getUser(data.account).isOnline = false)
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

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