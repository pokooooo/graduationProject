const { read, write } = require('../lib/read&write')

const __Role = []
const ROLEURL = '../data/roles.json'
function setRole(role) {
  __Role.push(role)
  write(__Role, ROLEURL)
}

function editRole(role) {
  __Role.splice(
    __Role.findIndex((item) => item.id == role.id),
    1,
    role,
  )
  write(__Role, ROLEURL)
}

function deleteRole(id) {
  let role = __Role.find((item) => item.id === id)
  __Role.splice(
    __Role.findIndex((item) => item.id == role.id),
    1,
    { ...role, status: -1 },
  )
  write(__Role, ROLEURL)
}

function getAllRole() {
  let data = read(ROLEURL)
  __Role.push(...data)
}

function getRole(id) {
  return __Role.find((item) => item.id === id)
}

module.exports = {
  roles: __Role,
  getAllRole,
  setRole,
  editRole,
  deleteRole,
  getRole,
}
