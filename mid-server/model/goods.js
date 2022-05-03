const { read, write } = require('../lib/read&write')

const __Goods = []
const USERSURL = '../data/goods.json'

function setGoods(goods) {
    __Goods.push(goods)
    write(__Goods, USERSURL)
}

function editGoods(goods) {
    __Goods.map(item => {
        if(item.id === goods.id) {
            Object.assign(item,goods)
        }
    })
    write(__Goods, USERSURL)
}

function deleteGoods(id) {
    __Goods.splice(__Goods.findIndex((item) => item.id == id), 1)
    write(__Goods, USERSURL)
}

function getAllGoods() {
    let data = read(USERSURL)
    __Goods.push(...data)
}

function getGoods(id) {
    return __Goods.find((item) => item.id === id)
}

function getGoodsByAccount(account) {
    let list = []
    __Goods.forEach(item => {
        if(item.seller === account) {
            list.push(item)
        }
    })
    return list
}

function hasGoods(id) {
    return !getGoods(id)
}

module.exports = {
    goodss: __Goods,
    getAllGoods,
    setGoods,
    editGoods,
    deleteGoods,
    getGoods,
    hasGoods,
    getGoodsByAccount,

}
