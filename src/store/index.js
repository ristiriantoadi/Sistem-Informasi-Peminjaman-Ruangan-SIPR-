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
        setToken(state,input){
            state.token=input
        },
        login(state,input){
            state.isLoggedIn = input
        }
    },
    actions:{
    }
})
