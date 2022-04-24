const { read, write } = require('../lib/read&write')

const __Users = []
const USERSURL = '../data/users.json'

function setUser(user) {
  __Users.push(user)
  write(__Users, USERSURL)
}

function editUser(user) {
  __Users.map(item => {
    if(item.account === user.account) {
      Object.assign(item,user)
    }
  })
  write(__Users, USERSURL)
}

function deleteUser(account) {
  __Users.filter(item => item.account !== account);
  write(__Users, USERSURL)
}

function getAllUser() {
  let data = read(USERSURL)
  __Users.push(...data)
}

function getUser(account) {
  return __Users.find((item) => item.account === account)
}

function hasUser(account) {
  return !getUser(account)
}



module.exports = {
  users: __Users,
  getAllUser,
  setUser,
  editUser,
  deleteUser,
  getUser,
  hasUser
}
