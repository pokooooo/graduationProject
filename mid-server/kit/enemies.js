
const { Enemies } = require('../model/enemies')

function searchEnemies(pageIndex, pageSize, keyword) {
    let _all = Enemies
        .filter((item) => item.name.includes(keyword) && item.status !== -1)
        .sort((a, b) => b.weight - a.weight)
    return [
        pageIndex == 0 || pageSize == 0
            ? _all
            : _all.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        _all.length,
    ]
}

function hasOne(id) {
    return Enemies.findIndex((item) => item.id === id && item.status !== -1) >= 0
}

module.exports = {
    searchEnemies,
    hasOne,
}
