import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        groupId: '',
        // tempArr: [],
        selectArr: [],
        policyInfo: {
            classifyList: [],
            nameList: [],
            groupId: ''
            
        }
    },
    mutations: {
        changeUser (state, newArr) {
            state.selectArr = newArr;

        },
        // changeTemp (state, newArr) {
        //     state.tempArr = newArr;
        //     console.log('newArr',newArr)
        //     console.log(state.tempArr)
        // },
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