import Vue from 'vue'
import Vuex from 'vuex'
import orderManageData from './mudoles/orderManageDate'

Vue.use(Vuex)

const state = { 
    examPlanEditID:0
}

const  mutations = {
    
}

const getters = {


}

const actions = {

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