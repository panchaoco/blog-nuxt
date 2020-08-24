import axios from 'axios'
import store from '../store'
import {
  apiHost
} from "./environment"

const instance = axios.create({
})

instance.interceptors.request.use(
  config => {
    console.log('process.browser', process.browser)
    if (process.browser && window.localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
    }
    return config
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return error
  }
)

const request = async (url, options = {}) => {
  let api = url.includes('http') ? url : `${apiHost}${url}`;
  const method = (options.method || 'GET').toLocaleLowerCase()
  let res = null
  if (method === 'get') {
    const opt = {
      params: options.params ? JSON.parse(JSON.stringify(options.params)) : {}
    }
    if (opt.params.id) {
      api += `/${opt.params.id}`;
      delete opt.params.id;
    }
    res = await instance.get(api, opt)
  } else if (method === 'post') {
    res = await instance.post(api, options.body)
  } else if (method === 'patch') {
    api += `/${options.body.id}`
    const body = options.body
    delete body.id
    res = await instance.patch(api, body)
  }
  return new Promise((resolve, reject) => {
    if (url === '/v1/api/category') {
    }
    if (res && res.status >= 200 && res.status < 300) {
      return resolve(res.data)
    } else {
      return reject(res)
    }
  })
}

export default request
