import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate' //首先引入
import orderManageData from './mudoles/orderManageDate'

Vue.use(Vuex)

const state = { 
    examPlanEditId:null,
    roomId:null,
    deleCurrentRowId:null,
    //登录页面存储用户信息
    userInfo:{}
}

const getters = {
    // userInfo:{
    //     token:''
    // }

}

const  mutations = {
    saveUserInfo(state,val){
        state.userInfo = val;
        console.log(state.userInfo)
    },
    modifyData(state,val){
        state.examPlanEditId = val.currentId;
        state.roomId =val.storeRoomId
        console.log(state.examPlanEditId,state.roomId)
    },
    deleCurrentRow(state,val){
        state.deleCurrentRowId = val;
    },
    resetDeledeleCurrentRowId(state,val){
        state.deleCurrentRowId = val;
    }
}

const actions = {
    saveUserInfo({commit},userInfo){
        commit('saveUserInfo',userInfo)
    },
    modifyDate({commit},obj){
        commit('modifyData',obj)
    },
    deleCurrentRow({commit},delCurrenId){
        commit('deleCurrentRow',delCurrenId)
    },
    resetDeledeleCurrentRowId({commit},resetCurrenId){
        commit('resetDeledeleCurrentRowId',resetCurrenId)
    }
}

export default  new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [persistedState ()] //加上这个就可以了 
    // modules:{
    //     orderManageData,
    // }
})