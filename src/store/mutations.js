export default {
    updata(state,data) {
        state.userData = data
    },
    logout(state) {
        state.userData = {}
    },
    updataMail(state,data) {
        state.message.mailList = data
    }
}