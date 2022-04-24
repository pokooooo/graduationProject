const { read, write } = require('../lib/read&write')

const __Events = []
const EVENTSURL = '../data/events.json'
function setEvents(events) {
    __Events.push(events)
    write(__Events, EVENTSURL)
}

function editEvents(events) {
    __Events.splice(
        __Events.findIndex((item) => item.id == events.id),
        1,
        events,
    )
    write(__Events, EVENTSURL)
}

function deleteEvents(id) {
    let events = getEvents(id)
    __Events.splice(
        __Events.findIndex((item) => item.id == events.id),
        1,
    )
    write(__Events, EVENTSURL)
}

function getAllEvents() {
    let data = read(EVENTSURL)
    __Events.push(...data)
}

function getEvents(id) {
    return __Events.find((item) => item.id === id)
}

module.exports = {
    Events: __Events,
    getAllEvents,
    setEvents,
    editEvents,
    deleteEvents,
    getEvents,
}
