const { read, write } = require('../lib/read&write')

const __Artifacts = []
const ARTIFACTSURL = '../data/artifacts.json'
function setArtifacts(artifacts) {
    __Artifacts.push(artifacts)
    write(__Artifacts, ARTIFACTSURL)
}

function editArtifacts(artifacts) {
    __Artifacts.splice(
        __Artifacts.findIndex((item) => item.id == artifacts.id),
        1,
        artifacts,
    )
    write(__Artifacts, ARTIFACTSURL)
}

function deleteArtifacts(id) {
    let artifacts = getArtifacts(id)
    __Artifacts.splice(
        __Artifacts.findIndex((item) => item.id == artifacts.id),
        1,
    )
    write(__Artifacts, ARTIFACTSURL)
}

function getAllArtifacts() {
    let data = read(ARTIFACTSURL)
    __Artifacts.push(...data)
}

function getArtifacts(id) {
    return __Artifacts.find((item) => item.id === id)
}

module.exports = {
    Artifacts: __Artifacts,
    getAllArtifacts,
    setArtifacts,
    editArtifacts,
    deleteArtifacts,
    getArtifacts,
}
