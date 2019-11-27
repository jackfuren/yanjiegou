import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '/yjg',
  // baseURL:'http://svn.yanjiegou.com/',
  timeout: 5000 ,// 请求超时时间
  headers: {
    'content-type': "application/json;charset=utf-8"
  }
})
service.defaults.withCredentials = true
// request拦截器
service.interceptors.request.use(
  config => {
    //consoleog(config)
    /*
    if (config.method === "post") {
      // 序列化
      //console.log(config)
      config.data = qs.stringify(config.data); // ***** 这里转义
    }*/

    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    //console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * 在这里拦截抛错 可结合自己业务进行修改
     * res.code || other
     */
    return response
  },
  error => {
    //console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
