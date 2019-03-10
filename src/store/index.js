import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        money: 20,
        policyInfo: {
            classifyList: [],
            nameList: [],
            groupId: ''
            
        }
    },
    mutations: {
        changeMoney (state, num) {
            state.money += num
        },
        changeClassify (state, newArr) {
            state.classifyList = newArr
        },
        changeName (state, newArr) {
            state.nameList = newArr
        },
        changeGroup (state, newGroup) {
            state.groupId = newGroup
        }
    }
})

export default store