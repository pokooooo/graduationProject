const { read, write } = require('../lib/read&write')

const __Weapons = []
const WEAPONSURL = '../data/weapons.json'
function setWeapons(weapons) {
    __Weapons.push(weapons)
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
}
