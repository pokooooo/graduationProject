const { read, write } = require('../lib/read&write')

const __Mail = []
const USERSURL = '../data/mail.json'

function setMail(mail) {
  __Mail.push(mail)
  write(__Mail, USERSURL)
}

function editMail(mail) {
  __Mail.map(item => {
    if(item.id === mail.id) {
      Object.assign(item,mail)
    }
  })
  write(__Mail, USERSURL)
}

function deleteMail(id) {
  __Mail.filter(item => item.id !== id);
  write(__Mail, USERSURL)
}

function getAllMail() {
  let data = read(USERSURL)
  __Mail.push(...data)
}

function getMail(id) {
  return __Mail.find((item) => item.id === id)
}

function getMailByAccount(account) {
  let list = []
  __Mail.forEach(item => {
    if(item.receiver === account) {
      list.push(item)
    }
  })
  return list
}

function hasMail(id) {
  return !getMail(id)
}

module.exports = {
  mail: __Mail,
  getAllMail,
  setMail,
  editMail,
  deleteMail,
  getMail,
  hasMail,
  getMailByAccount
}
