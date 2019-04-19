import Vue from 'vue'
import Vuex from 'vuex'
import orderManageData from './mudoles/orderManageDate'

Vue.use(Vuex)

const state = { 
    examPlanEditId:null,
    roomId:null,
    deleCurrentRowId:null,
    //登录页面设置token
}

const getters = {
    // userInfo:{
    //     token:''
    // }

}

const  mutations = {
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

export default new  Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    // modules:{
    //     orderManageData,
    // }
})