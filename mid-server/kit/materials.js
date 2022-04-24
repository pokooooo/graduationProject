
const { Materials } = require('../model/materials')

function searchMaterials(pageIndex, pageSize, keyword) {
    let _all = Materials
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
    return Materials.findIndex((item) => item.id === id && item.status !== -1) >= 0
}

module.exports = {
    searchMaterials,
    hasOne,
}
