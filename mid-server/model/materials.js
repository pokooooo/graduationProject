const { read, write } = require('../lib/read&write')

const __Materials = []
const MATERIALSURL = '../data/materials.json'
function setMaterials(materials) {
    __Materials.push(materials)
    write(__Materials, MATERIALSURL)
}

function editMaterials(materials) {
    __Materials.splice(
        __Materials.findIndex((item) => item.id == materials.id),
        1,
        materials,
    )
    write(__Materials, MATERIALSURL)
}

function deleteMaterials(id) {
    let materials = getMaterials(id)
    __Materials.splice(
        __Materials.findIndex((item) => item.id == materials.id),
        1,
    )
    write(__Materials, MATERIALSURL)
}

function getAllMaterials() {
    let data = read(MATERIALSURL)
    __Materials.push(...data)
}

function getMaterials(id) {
    return __Materials.find((item) => item.id === id)
}

module.exports = {
    Materials: __Materials,
    getAllMaterials,
    setMaterials,
    editMaterials,
    deleteMaterials,
    getMaterials,
}
