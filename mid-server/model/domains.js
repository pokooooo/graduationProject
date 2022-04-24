const { read, write } = require('../lib/read&write')

const __Domains = []

const DOMAINSURL = '../data/domains.json'
function setDomains(domains) {
    __Domains.push(domains)
    write(__Domains, DOMAINSURL)
}

function editDomains(domains) {
    __Domains.splice(
        __Domains.findIndex((item) => item.id == domains.id),
        1,
        domains,
    )
    write(__Domains, DOMAINSURL)
}

function deleteDomains(id) {
    let domains = getDomains(id)
    __Domains.splice(
        __Domains.findIndex((item) => item.id == domains.id),
        1,
    )
    write(__Domains, DOMAINSURL)
}

function getAllDomains() {
    let data = read(DOMAINSURL)
    __Domains.push(...data)
}

function getDomains(id) {
    return __Domains.find((item) => item.id === id)
}

module.exports = {
    Domains: __Domains,
    getAllDomains,
    setDomains,
    editDomains,
    deleteDomains,
    getDomains,
}
