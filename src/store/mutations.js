export default {
    init(state,payload){
        state.userData = payload
        console.log(state.userData);
    }
}