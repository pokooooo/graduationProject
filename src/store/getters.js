export default {
    getUserData(state) {
        return state.userData
    },
    getNoticeList(state) {
        return state.message.noticeList
    },
    getMailList(state) {
        return state.message.mailList
    },
    getChatList(state) {
        return state.message.chatList
    },
    getMessageCount(state) {
        return state.message.noticeList.filter(item => !item.isRead).length + state.message.mailList.filter(item => !item.isRead).length + state.message.chatList.filter(item => !item.isRead).length
    }
}