import Vue from 'vue'
import Vuex from 'vuex'
import orderManageData from './mudoles/orderManageDate'

Vue.use(Vuex)

const state = { 
    examPlanEditId:16,
    roomId:1,
    deleCurrentRowId:null,
}

const getters = {


}

const  mutations = {
    modifyData(state,val){
        state.examPlanEditId = val;
        console.log(state.examPlanEditId)
    },
    deleCurrentRow(state,val){
        state.deleCurrentRowId = val;
    }
}

const actions = {
    modifyDate({commit},currentId){
        commit('modifyData',currentId)
    },
    deleCurrentRow({commit},delcurrenId){
        commit('deleCurrentRow',delcurrenId)
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