const { users } = require('../model/users')

function searchUsers(pageIndex, pageSize, keyword, type) {
  let _all = users.filter(
    (item) => item[type].includes(keyword)
  )
  return [
    pageIndex == 0 || pageSize == 0
      ? _all
      : _all.slice((pageIndex - 1) * pageSize, pageIndex * pageSize).sort((a,b) => b.level - a.level),
    _all.length,
  ]
}

function hasOne(id) {
  return users.findIndex((item) => item.id === id && item.status !== -1) >= 0
}

module.exports = {
  hasOne,
  searchUsers,
}
