const { users,getUser, editUser} = require('../model/users')
const {getMaterials} = require("../model/materials");
const {getWeapons} = require("../model/weapons");
const {getRole} = require("../model/roles")
const {getArtifacts} = require("../model/artifacts")
const uuid = require('uuid')
const {logger} = require("sequelize/lib/utils/logger");


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

function addMaterial(account, iid, num) {
  let user = getUser(account)
  let material = getMaterials(iid)
  let {name,get,introduction,purpose,cover,id,weight} = material
  let old = null
  user.inventory.materials.map(item => {
    if(item.id === material.id) old = item
  })
  if(old !== null) {
    old.num += num
  } else {
    user.inventory.materials.push({name,get,introduction,purpose,cover,id,weight,num})
  }
  editUser(user)
  return material
}

function addWeapon(account, iid) {
  let user = getUser(account)
  let {name,star,type,introduction,material,cover,ATK,ATKIncrease,secondary,effect,id,weight,level,rank} = getWeapons(iid)
  let weapon = {name,star,type,introduction,material,cover,ATK,ATKIncrease,secondary,effect,id,weight,level,rank}
  weapon.id = uuid.v4()
  weapon.role = {
    name: '',
    id: '',
    cover: ''
  }
  weapon.experience = 0,
  user.inventory.weapons.push(weapon)
  editUser(user)
  return weapon
}

function addRole(account, iid) {
  let user = getUser(account)
  let {name,star,vision,type,introduction,cover,background,background1,stats,ascend,weight} = getRole(iid)
  if (user.roles.findIndex((item) => item.name === name) >= 0){
    return {
      name: '无主的星辉',
      num: getRole(iid).star === 5 ? 25 : 5,
      cover: 'http://localhost:3000/images/9ffcba79-0cfa-4615-bab5-ff8be76a71fe.png'
    }
  }

  let role = {name,star,vision,type,introduction,cover,background,stats,ascend,weight,background1}
  role.stats = Object.assign(role.stats,{
    HP: 0,
    ATK: 0,
    DEF: 0,
    CRITRate: 5,
    CRITDMG: 50,
    energyRecharge: 100,
    healingBonus: 0,
    shieldStrength: 0,
    elementDMGBonus: 0,
    physicalDMGBonus: 0,
    pyroDMGBonus: 0,
    hydroDMGBonus: 0,
    electroDMGBonus: 0,
    anemoDMGBonus: 0,
    cryoDMGBonus: 0,
    geoDMGBonus: 0
  })
  user.roles.push(Object.assign(role,{
    level: 1,
    experience: 0,
    rank: 1,
    id: uuid.v4(),
    weapon: {},
    artifacts: {
      flower: {},
      plume: {},
      sands: {},
      goblet: {},
      circlet: {},
    }
  }))
  editUser(user)
  return role
}

function addEXP(account,experience) {
  let up = false
  let user = getUser(account)
  if(experience + user.experience >= 2000) {
    user.experience = user.experience + experience - 2000
    user.level++
    up = true
  } else {
    user.experience = user.experience + experience
  }
  editUser(user)
  return up
}

let basicEffect = [
  {
    type: "ATK",
    num: 7,
    increase: 2
  },  {
    type: "HP",
    num: 7,
    increase: 2
  },  {
    type: "DEF",
    num: 8.7,
    increase: 2.5
  }
]

let flowerEffect = {
  type: "HP",
  num: 7,
  increase: 2
}
let plumeEffect = {
  type: "ATK",
  num: 7,
  increase: 2
}
let sandsEffect = [
  {
    type: "energyRecharge",
    num: 7.8,
    increase: 2.2
  }
].concat(basicEffect)
let gobletEffect = [
  {
    type: "pyroDMGBonus",
    num: 7,
    increase: 2
  },  {
    type: "hydroDMGBonus",
    num: 7,
    increase: 2
  },  {
    type: "electroDMGBonus",
    num: 7,
    increase: 2
  },  {
    type: "anemoDMGBonus",
    num: 7,
    increase: 2
  },  {
    type: "cryoDMGBonus",
    num: 7,
    increase: 2
  },  {
    type: "physicalDMGBonus",
    num: 7,
    increase: 2
  }, {
    type: "geoDMGBonus",
    num: 8.7,
    increase: 2.5
  }
].concat(basicEffect)
let circletEffect = [
  {
    type: "healingBonus",
    num: 5.4,
    increase: 1.5
  },  {
    type: "shieldStrength",
    num: 5.4,
    increase: 1.5
  },  {
    type: "CRITDMG",
    num: 9.3,
    increase: 2.6
  },  {
    type: "CRITRate",
    num: 4.7,
    increase: 1.3
  },
].concat(basicEffect)

let addEffects = [
  {
    type: "ATK",
    num: 5,
    increase: 5
  },  {
    type: "HP",
    num: 5,
    increase: 5
  },  {
    type: "DEF",
    num: 6.2,
    increase: 6.2
  },  {
    type: "energyRecharge",
    num: 5.5,
    increase: 5.5
  },  {
    type: "CRITDMG",
    num: 6.6,
    increase: 6.6
  },  {
    type: "CRITRate",
    num: 3.3,
    increase: 3.3
  },
]

function addEffect(artifact) {
  if(artifact.effects.length < 4) {
    let effects = addEffects.filter(item => {
      let same = false
      artifact.effects.map(item1 => {
        if(item1.type === item.type) same = true
      })
      return !same
    })
    artifact.effects.push(effects[Math.floor(Math.random() * effects.length)])
  } else {
    let index = Math.floor(Math.random() * artifact.effects.length)
    artifact.effects[index].num += artifact.effects[index].increase
    artifact.effects[index].num = artifact.effects[index].num.toFixed(1) * 1
  }
  return artifact
}

function addArtifact(account, iid, num) {
  let user = getUser(account)
  let {pieceSet,get,parts} = getArtifacts(iid)
  let {part,name,cover,introduction} = parts[Math.floor(Math.random() * parts.length)]
  let artifact = {pieceSet,get,part,name,cover,introduction}
  if(artifact.part === 'flower') artifact.effect = flowerEffect
  if(artifact.part === 'plume') artifact.effect = plumeEffect
  if(artifact.part === 'sands') artifact.effect = sandsEffect[Math.floor(Math.random() * sandsEffect.length)]
  if(artifact.part === 'goblet') artifact.effect = gobletEffect[Math.floor(Math.random() * gobletEffect.length)]
  if(artifact.part === 'circlet') artifact.effect = circletEffect[Math.floor(Math.random() * circletEffect.length)]
  artifact.effects = []
  for(let i = 0; i < num; i++) {
    artifact = addEffect(artifact)
  }
  artifact.name1 = getArtifacts(iid).name
  artifact.id = uuid.v4()
  artifact.role = {
    name: '',
    id: '',
    cover: ''
  }
  artifact.level = 0
  user.inventory.artifacts.push(artifact)
  editUser(user)
  return artifact
}

function deleteArtifact(account, id) {
  let user = getUser(account)
  user.inventory.artifacts.splice(user.inventory.artifacts.findIndex((item) => item.id == id), 1)
  editUser(user)
}

function addArtifact1(account, artifact) {
  let user = getUser(account)
  user.inventory.artifacts.push(artifact)
  editUser(user)
}

function addArtifact2(account, artifact, price) {
  let user = getUser(account)
  user.inventory.artifacts.push(artifact)
  user.gold += -price
  editUser(user)
}

function hasOne(id) {
  return users.findIndex((item) => item.id === id && item.status !== -1) >= 0
}

module.exports = {
  hasOne,
  searchUsers,
  addEffect,
  addMaterial,
  addWeapon,
  addRole,
  addEXP,
  addArtifact,
  deleteArtifact,
  addArtifact1,
  addArtifact2
}
