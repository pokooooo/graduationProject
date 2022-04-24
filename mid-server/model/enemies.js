const { read, write } = require('../lib/read&write')

const __Enemies = []
const ENEMIESURL = '../data/enemies.json'
function setEnemies(enemies) {
    __Enemies.push(enemies)
    write(__Enemies, ENEMIESURL)
}

function editEnemies(enemies) {
    __Enemies.splice(
        __Enemies.findIndex((item) => item.id == enemies.id),
        1,
        enemies,
    )
    write(__Enemies, ENEMIESURL)
}

function deleteEnemies(id) {
    let enemies = getEnemies(id)
    __Enemies.splice(
        __Enemies.findIndex((item) => item.id == enemies.id),
        1,
    )
    write(__Enemies, ENEMIESURL)
}

function getAllEnemies() {
    let data = read(ENEMIESURL)
    __Enemies.push(...data)
}

function getEnemies(id) {
    return __Enemies.find((item) => item.id === id)
}

module.exports = {
    Enemies: __Enemies,
    getAllEnemies,
    setEnemies,
    editEnemies,
    deleteEnemies,
    getEnemies,
}
