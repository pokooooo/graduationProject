export default {
    init(state,payload){
        state.userData = payload
    },
    updata(state,data) {
        state.userData = data
    },
    logout(state) {
        state.userData = {}
    },
    updataMail(state,data) {
        state.message.mail = data
    }
}