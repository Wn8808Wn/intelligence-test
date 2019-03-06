const state = {
    id : 0
}

const mutations = {
    modify (state, val) {
        state.id = val
    }
      
    
}

const getters = {
    
}

const actions = {
    modify({commit,state}){
        
        commit('modify')
    }
}
export default {
    state,
    mutations,
    getters,
    actions
}