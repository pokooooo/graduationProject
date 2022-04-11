const { read, write } = require('../lib/read&write')

const __Chat = []
const USERSURL = '../data/chat.json'

function setChat(chat) {
    __Chat.push(chat)
    write(__Chat, USERSURL)
}

function editChat(chat) {
    __Chat.map(item => {
        if(item.id === chat.id) {
            Object.assign(item,chat)
        }
    })
    write(__Chat, USERSURL)
}

function deleteChat(id) {
    __Chat.filter(item => item.id !== id);
    write(__Chat, USERSURL)
}

function getAllChat() {
    let data = read(USERSURL)
    __Chat.push(...data)
}

function getChat(id) {
    return __Chat.find((item) => item.id === id)
}

function getChatByAccount(account) {
    let list = []
    __Chat.forEach(item => {
        if(item.account1 === account || item.account2 === account) {
            list.push(item)
        }
    })
    return list
}

function getChatByAccount2(account1,account2) {
    __Chat.forEach(item => {
        if((item.account1 === account1 && item.account2 === account2) || (item.account1 === account2 && item.account1 === account2)) {
            return item
        }
    })
    return false

}

function hasChatByAccount2(account1,account2) {
    let b = false
    __Chat.forEach(item => {
        if((item.account1 === account1 && item.account2 === account2) || (item.account1 === account2 && item.account1 === account2)) {
            b = true
        }
    })
    return b

}

function hasChat(id) {
    return !getChat(id)
}

module.exports = {
    chat: __Chat,
    getAllChat,
    setChat,
    editChat,
    deleteChat,
    getChat,
    hasChat,
    getChatByAccount,
    getChatByAccount2,
    hasChatByAccount2
}
