export default {
    getAccount(state) {
        return state.userData.account
    },
    getNickname(state) {
        return state.userData.nickname
    },
    getAvatar(state) {
        return state.userData.avatar
    },
    getPwd(state) {
        return state.userData.pwd
    },
    getUserData(state) {
        return state.userData
    }


}