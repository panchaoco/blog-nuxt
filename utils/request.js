import axios from 'axios'
import {
  apiHost
} from "./environment"
// create an axios instance
console.log('process.env.VUE_APP_BASE_API', process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: apiHost, // url = base url + request url
  // baseURL: 'http://192.168.90.22:8887/api/admin-service',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.params) {
      Object.entries(config.params).map(([key, value]) => {
        if (Object.prototype.toString.call(value) === '[object Date]') {
          config.params[key] = value.valueOf()
        }
      })
    }
    if (process.browser && window.localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
