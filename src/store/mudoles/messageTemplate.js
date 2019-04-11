import * as types from '../mutation-types'
import { api } from '../../plugins/api'
import qs from 'querystring'
import _ from 'ramda'
export const state={
  accountSecurityList:{
    pageBegin: 1,
    fetchNum: 10,
    count: 0,
    items: []
  },
  form: {
    pageBegin: 1,
    fetchNum: 10
  }
}
export const actions={
  async fetchAccountSecurityListListByPage({ commit, state }, params){
    if (params) {
      state.form = params;
    }
    let p = params || state.form;
    let { data: { pageBegin, totalNums, resultList, totalPages } } = await api.get(`/usm/loopholeUser?${qs.stringify(p)}`)
    // let {data:{pageBegin,totalNums,resultList,totalPages}}=await api.get(`/usm/loopholeUser?${qs.stringify(query)}`)
    let accountSecurityList = {
      pageBegin: pageBegin,
      fetchNum: params && params.fetchNum || 10,
      count: totalNums,
      items: resultList
    }
    commit(types.ACCOUNTSECURITY_LIST_UPDATE, accountSecurityList)
  },
  async lockUserInfo(store, o) {  //锁定
    await api.put(`/usm/lockUser/${o.userId}`)
    await actions.fetchAccountSecurityListListByPage(store)
  },

  async unLockUserInfo(store, o) {  //解锁
    await api.put(`/usm/unLockUser/${o.userId}`)
    await actions.fetchAccountSecurityListListByPage(store)
  },

}
export const mutations={
  [types.ACCOUNTSECURITY_LIST_UPDATE](state,items){
    state.accountSecurityList = Object.assign(state.accountSecurityList, items)
  }
}
export default {
  state,
  actions,
  mutations
}



