import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        token:'',
        isLoggedIn:false
    },
    getters:{
    },
    mutations:{
        login(state,token){
            state.token = token
            state.isLoggedIn=true
        }
    },
    actions:{
    }
})
