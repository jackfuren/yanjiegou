//全局方法
const actions = {
  Arr({commit}, data) {
    commit('Ar', data)
  },
  Money({commit}, data) {
    commit('Mon', data)
  },
  Bei({commit}, data) {
    commit('Be', data)
  },
  Qingk({commit}, data) {
    commit('Qing', data)
  },
  UserName({commit},data){
    commit('USERNAME',data)
  },
  Ph({commit},data){
    commit('PH',data)
  },
  Quit({commit}){
    commit('QUIT')
  }
}
export default actions
