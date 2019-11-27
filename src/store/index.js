import Vuex from 'vuex'
import Vue from 'vue'
//2. 分别引入对应的文件
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from  "./getters"
//使得vuex生效
Vue.use(Vuex)

//1.首先创建一个store实例
const store = new Vuex.Store({
  //3.将全局的变量和方法放到vuex实例里面
  //在外边你就可以正常访问了
  state, //全局的变量
  mutations, //改变全局变量的方法
  actions, //全局的方法
  getters
})
export default store
