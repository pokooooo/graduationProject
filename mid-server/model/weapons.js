const { read, write } = require('../lib/read&write')

const __Weapons = []
const WEAPONSURL = '../data/weapons.json'
function setWeapons(weapons) {
    __Weapons.push(weapons)
    write(__Weapons, WEAPONSURL)
}

function setWeapons1() {
    __Weapons.map(item => {
        let add = 0
        if(item.star === 5) {
            add = 5
        }
        if(item.type === 'bow') item.weight = add + 5
        if(item.type === 'catalyst') item.weight = add + 4
        if(item.type === 'sword') item.weight = add + 1
        if(item.type === 'claymore') item.weight = add + 2
        if(item.type === 'polearm') item.weight = add + 3
    })
    write(__Weapons, WEAPONSURL)
}

function editWeapons(weapons) {
    __Weapons.splice(
        __Weapons.findIndex((item) => item.id == weapons.id),
        1,
        weapons,
    )
    write(__Weapons, WEAPONSURL)
}

function deleteWeapons(id) {
    let weapons = getWeapons(id)
    __Weapons.splice(
        __Weapons.findIndex((item) => item.id == weapons.id),
        1,
    )
    write(__Weapons, WEAPONSURL)
}

function getAllWeapons() {
    let data = read(WEAPONSURL)
    __Weapons.push(...data)
}

function getWeapons(id) {
    return __Weapons.find((item) => item.id === id)
}

module.exports = {
    Weapons: __Weapons,
    getAllWeapons,
    setWeapons,
    editWeapons,
    deleteWeapons,
    getWeapons,
    setWeapons1
}
