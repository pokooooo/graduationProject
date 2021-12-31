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
        return state.message.noticeList.lenght + state.message.mailList.lenght + state.message.chatList.lenght
    }
}