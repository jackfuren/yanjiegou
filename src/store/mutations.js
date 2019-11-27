//全局的改变state的方法import  storage from "../storage/storage"
const mutations = {
  Ar: (state, data) => {
    state.dataList = data;
    // window.sessionStorage.setItem('dataList',data)
  },
  Mon: (state, data) => {
    state.money = data;
    //window.sessionStorage.setItem('dataList',data)
  },
  Be: (state, data) => {
    state.bei = data;

  },
  Qing: (state, data) => {
    state.bei = data;
    state.dataList = data;
    state.money = data;
		state.num = data;

  },
  USERNAME:(state,data)=>{

    state.username = data;
    window.localStorage.setItem("username" ,JSON.stringify(data))

  },
  PH:(state,data)=>{
    state.phData = data;
  },
  QUIT:(state,data)=>{
    state.username =data;
   window.localStorage.removeItem("username")
  }
}
export default mutations
