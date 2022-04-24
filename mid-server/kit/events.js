
const { Events } = require('../model/events')

function searchEvents(pageIndex, pageSize, keyword) {
    let _all = Events
        .filter((item) => item.name.includes(keyword))
    return [
        pageIndex == 0 || pageSize == 0
            ? _all
            : _all.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        _all.length,
    ]
}

function hasOne(id) {
    return Events.findIndex((item) => item.id === id && item.status !== -1) >= 0
}

module.exports = {
    searchEvents,
    hasOne,
}
