const { roles } = require('../model/roles.js')

function searchRoles(pageIndex, pageSize, keyword) {
  let _all = roles.filter(
    (item) => item.name.includes(keyword),
  )
  return [
    pageIndex == 0 || pageSize == 0
      ? _all
      : _all.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    _all.length,
  ]
}

function hasOne(id) {
  return roles.findIndex((item) => item.id === id) >= 0
}

module.exports = {
  hasOne,
  searchRoles,
}
