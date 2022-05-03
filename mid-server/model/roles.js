const { read, write } = require('../lib/read&write')

const __Role = []
const ROLEURL = '../data/roles.json'
function setRole(rich) {
  __Role.push(rich)
  write(__Role, ROLEURL)
}

function editRole(rich) {
  __Role.splice(
    __Role.findIndex((item) => item.id == rich.id),
    1,
    rich,
  )
  write(__Role, ROLEURL)
}

function deleteRole(id) {
  let rich = __Role.find((item) => item.id === id)
  __Role.splice(
    __Role.findIndex((item) => item.id == rich.id),
    1,
    { ...rich, status: -1 },
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
