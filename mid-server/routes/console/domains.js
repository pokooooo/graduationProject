const Router = require('koa-router')
const uuid = require('uuid')
const { searchDomains, hasOne } = require('../../kit/domains')
const { check, catchError, generateOk } = require('../../lib/check')
const {
    setDomains,
    editDomains,
    deleteDomains,
    getDomains,
} = require('../../model/domains')
const { hasToken } = require('../../model/token')
const {getArtifacts} = require("../../model/artifacts");
const {getMaterials} = require("../../model/materials");
const {getUser, editUser} = require("../../model/users");
const {addArtifact, addMaterial, addEXP} = require("../../kit/users");
let domains = new Router()
let HP = [73,93,114,138,164,192,222,238,262,287,327,369,412,461,511,562,625,680,736,885,932,979,1024,
    1084,1145,1208,1272,1338,1405,1493,1555,1639,1708,2020,2089,2158,2253,2358,2464,2695,2825,2958,3084,
    3212,3593,3719,3935,4155,4380,4996,5224,5455,5688,5924,6147,6333,6572,6835,7101,8381,
    8657,8961,9268,9668,9983,10242,11265,11620,11950,13052,13411,13806,14092,14504,14921,15265,15664,16067,
    16440,18566,18948,19333,19573,20179,20424,20823,21245,21718,22197,24354,24932,25571,26218,27123,
    27749,27923,28116,30658,30870,36765]
let ATK = [25,29,34,38,43,48,53,58,63,68,75,83,90,99,108,116,129,141,155,168,179,191,204,216,229,238,246,255,264,274,284,295,306,319,
    329,340,355,373,390,409,428,449,468,488,509,524,548,571,596,630,653,676,700,724,746,766,794,824,854,888,915,946,978,1015,1048,1071,
    1123,1158,1190,1224,1258,1294,1321,1359,1396,1424,1460,1496,1531,1575,1609,1641,1665,1689,1714,1741,1779,1819,1859,1904,1953,2005,2060,2130,2183,2200,2220,2384,2405,2463]
domains.post('/search', async (ctx) => {
    try {

        let { pageIndex, pageSize, keyword } = ctx.request.body
        check(pageIndex >= 0, 'Params_Is_Not_In_Rules')
        check(pageSize >= 0, 'Params_Is_Not_In_Rules')
        let data = searchDomains(pageIndex, pageSize, keyword)
        ctx.body = generateOk({
            items: data[0],
            total: data[1],
        })
    } catch (err) {
        catchError(err, ctx)
    }
})

domains.post('/add', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','??????????????????')
        check(hasToken(token), 'Admin_Login_Outdate', '?????????????????????')
        let data = ctx.request.body
        data.list = data.list.map(item => {
            if(data.type === 'artifact') return getArtifacts(item)
            else return getMaterials(item)
        })
        let id = uuid.v4()
        data =  Object.assign(data,{
            id,
            status: 1,
            cost: data.type === 'role' ? 60 : 20
        })
        setDomains(data )
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

domains.post('/get', async (ctx) => {
    try {
        let {account,id} = ctx.request.body

        let domain = getDomains(id)
        let rewards = []
        let gold = 20000
        let EXP = 100
        if(domain.type === 'artifact') {
            let num = Math.floor(Math.random() * 3) + 1
            let {name,cover} = addMaterial(account,'39414f02-33f6-4f6b-bf5e-c27582a13b86',num)
            rewards.push({name,cover,num})
            rewards.push(addArtifact(account,domain.list[Math.floor(Math.random() * domain.list.length)].id, Math.floor(Math.random() * 3) + 2))
        } else if(domain.type === 'role') {
            let num = Math.floor(Math.random() * 3) * 3 + 3
            let {name,cover} = addMaterial(account,'39414f02-33f6-4f6b-bf5e-c27582a13b86',num)
            rewards.push({name,cover,num})
            gold += 40000
            EXP += 200
            num = Math.floor(Math.random() * 3) + 1
             let data = addMaterial(account,domain.list[Math.floor(Math.random() * domain.list.length)].id, num)
            name = data.name
            cover = data.cover
            rewards.push({name,cover,num})
        } else {
            let num = Math.floor(Math.random() * 3) +1
            let {name,cover} = addMaterial(account,'39414f02-33f6-4f6b-bf5e-c27582a13b86',num)
            rewards.push({name,cover,num})
            num = Math.floor(Math.random() * 3) + 1
            let data = addMaterial(account,domain.list[Math.floor(Math.random() * domain.list.length)].id, num)
            name = data.name
            cover = data.cover
            rewards.push({name,cover,num})
        }
        let level = 0
        if(addEXP(account,EXP)) {
            level = getUser(account).level
        }
        let user = getUser(account)
        user.gold += gold
        user.resin = user.resin - gold / 1000
        editUser(user)
        ctx.body = generateOk({
            data: rewards,
            gold,
            EXP,
            level
        })
    } catch (err) {
        catchError(err, ctx)
    }
})


domains.post('/resin', async (ctx) => {
    try {
        let {account,num} = ctx.request.body
        addMaterial(account,'b35af67b-f3f7-4441-8a46-aaa54da51f17',num)
        if(num < 0) {
            let user = getUser(account)
            user.resin += -num * 60
            editUser(user)
        }
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

domains.post('/set', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','??????????????????')
        check(hasToken(token), 'Admin_Login_Outdate', '?????????????????????')
        let data = ctx.request.body
        check(hasOne(data.id))
        data.list = data.list.map(item => {
            if(data.type === 'artifact') return getArtifacts(item)
            else return getMaterials(item)
        })
        editDomains(data)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

domains.post('/setweight', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','??????????????????')
        check(hasToken(token), 'Admin_Login_Outdate', '?????????????????????')
        let { id, weight } = ctx.request.body
        check(weight >= 0)
        check(hasOne(id))
        let domains = getDomains(id)
        let obj = {
            ...domains,
            weight,
        }
        editDomains(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

domains.post('/up', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','??????????????????')
        check(hasToken(token), 'Admin_Login_Outdate', '?????????????????????')
        let { id } = ctx.request.body
        check(hasOne(id))
        let domains = getDomains(id)
        let obj = {
            ...domains,
            status: 1,
        }
        editDomains(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

domains.post('/down', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','??????????????????')
        check(hasToken(token), 'Admin_Login_Outdate', '?????????????????????')
        let { id } = ctx.request.body
        check(hasOne(id))
        let domains = getDomains(id)
        let obj = {
            ...domains,
            status: 2,
        }
        editDomains(obj)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

domains.post('/delete', async (ctx) => {
    try {
        let token = ctx.cookies.get('token')
        check(!!token, 'Admin_Not_Login','??????????????????')
        check(hasToken(token), 'Admin_Login_Outdate', '?????????????????????')
        let { id } = ctx.request.body
        check(hasOne(id))
        deleteDomains(id)
        ctx.body = generateOk()
    } catch (err) {
        catchError(err, ctx)
    }
})

module.exports = domains
