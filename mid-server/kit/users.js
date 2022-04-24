const { users,getUser, editUser} = require('../model/users')

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

function addMaterial(account, material) {
  let user = getUser(account)
  let old = null
  user.inventory.materials.map(item => {
    if(item.id === material.id) old = item
  })
  if(old !== null) {
    old.num += material.num
  } else {
    user.inventory.materials.push(material)
  }
  editUser(user)
}

function hasOne(id) {
  return users.findIndex((item) => item.id === id && item.status !== -1) >= 0
}

module.exports = {
  hasOne,
  searchUsers,
  addMaterial
}
