import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex)

const state = {
    userData: {},
    message: {
        noticeList: [],
        mailList: [],
        chatList: []
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store