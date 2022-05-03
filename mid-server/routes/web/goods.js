
const Router = require('koa-router')
const uuid = require('uuid')
const { catchError, check, generateOk } = require('../../lib/check')
const { setGoods, getGoods, editGoods, hasGoods,getGoodsByAccount, goodss ,deleteGoods} = require('../../model/goods')
const {getMailByAccount, setMail} = require("../../model/mail");
const {deleteArtifact, addArtifact1, addArtifact2} = require("../../kit/users");



let goods = new Router()

goods.post('/up', async (ctx) => {
    try {
        let data = ctx.request.body
        let {seller,good,price} = data
        setGoods({
            seller,
            good,
            price,
            time: new Date().getTime(),
            id: uuid.v4()
        })
        deleteArtifact(seller,good.id)
        ctx.body = generateOk({
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

goods.post('/down', async (ctx) => {
    try {
        let data = ctx.request.body
        let {seller,id} = data
        addArtifact1(seller,getGoods(id).good)
        deleteGoods(id)
        ctx.body = generateOk({
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

goods.post('/buy', async (ctx) => {
    try {
        let data = ctx.request.body
        let {purchaser,id} = data
        let goods = getGoods(id)
        addArtifact2(purchaser,goods.good,goods.price)
        setMail({
            sendTime: new Date().getTime(),
            id: uuid.v4(),
            isReceive: false,
            isRead: false,
            receiver: goods.seller,
            sender: 'PAIMON',
            title: '出售成功!',
            context: `您出售的${goods.good.name}已被${purchaser}购买!`,
            materialsList: [],
            gold: goods.price,
            diamond: 0
        })
        deleteGoods(id)
        ctx.body = generateOk({
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

goods.post('/get', async (ctx) => {
    try {
        let data = ctx.request.body
        ctx.body = generateOk({
            data: goodss
        })
    } catch (err) {
        catchError(err, ctx)
    }
})



goods.post('/buy', async (ctx) => {
    try {
        let data = ctx.request.body
        ctx.body = generateOk({
            data:getGoodsByAccount(data.account)
        })
    } catch (err) {
        catchError(err, ctx)
    }
})




module.exports = goods