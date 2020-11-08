import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        counter:1,
        token:''
    },
    getters:{
        timesThree:state=>{
            return state.counter*3
        },
        times:(state)=>(x)=>{
            return state.counter*x
        }
    },
    mutations:{
        increment(state){
            setTimeout(()=>{
                state.counter++
            },3000)
        },
        decrement(state){
            state.counter--
        },
        changeCounter(state,input){
            state.counter = input
        }
    },
    actions:{
        changeCounter(context,input){
            setTimeout(()=>{
                context.commit('changeCounter',input)
            },3000)
        }
    }
})
