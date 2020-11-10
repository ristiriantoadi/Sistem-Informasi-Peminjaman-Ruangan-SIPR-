import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        token:'',
        isLoggedIn:false,
        nim:'',
        namaLengkap:''
    },
    getters:{
    },
    mutations:{
        login(state,payload){
            state.token = payload.token
            state.nim = payload.nim
            state.namaLengkap = payload.namaLengkap
            state.isLoggedIn=true
        },
        logout(state){
            state.token=''
            state.nim=''
            state.namaLengkap=''
            state.isLoggedIn=false
        }
    },
    actions:{
    }
})
