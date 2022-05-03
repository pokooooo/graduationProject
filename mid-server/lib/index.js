const { Stat } = require('../config/stat')
const { getAllRole } = require('../model/roles')
const { getAllUser } = require('../model/users')
const { getAllMail } = require('../model/mail')
const { getAllChat } = require('../model/chat')
const { getAllGoods } = require('../model/goods')
const { getAllWeapons } = require('../model/weapons')
const { getAllArtifacts } = require('../model/artifacts')
const { getAllMaterials } = require('../model/materials')
const { getAllDomains } = require('../model/domains')
const { getAllEnemies } = require('../model/enemies')
const { getAllEvents } = require('../model/events')
const Exception = require('./exception')
const { read, write } = require('./read&write')
const fs = require('fs')
const path = require('path')

function init() {
  // 配置异常
  Exception.updates(Stat)
  // 配置数据
  getAllRole()
  getAllUser()
  getAllMail()
  getAllChat()
  getAllGoods()
  getAllWeapons()
  getAllArtifacts()
  getAllEvents()
  getAllEnemies()
  getAllDomains()
  getAllMaterials()
  const dir = path.join(__dirname, '../static')
  if (fs.existsSync(dir) === false) fs.mkdirSync(dir)
  const imageDir = path.join(__dirname, '../static/images')
  if (fs.existsSync(imageDir) === false) fs.mkdirSync(imageDir)
}

module.exports = {
  init,
  read,
  write,
}
