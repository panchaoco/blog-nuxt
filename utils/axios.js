import axios from 'axios'
import {
  apiHost
} from "./environment"

const instance = axios.create({
})

instance.interceptors.request.use(
  config => {
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

const Axios = async (url, options = {}) => {
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
    if (options.headers) {
      opt.headers = options.headers
    }
    console.log('params', opt)
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
    if (res && res.status >= 200 && res.status < 300) {
      return resolve(res.data)
    } else {
      return reject(res)
    }
  })
}

export default Axios
