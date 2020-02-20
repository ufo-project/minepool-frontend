/**
 * Created by janne on 2018/3/24.
 */

import axios from 'axios'

/* eslint-disable */
let base = API_ROOT

axios.defaults.withCredentials = false
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export const GET = (url, params) => {
  if (params && params != undefined) {
    return axios.get(`${base}${url}/${params}`).then(res => res.data)
  } else {
    return axios.get(`${base}${url}`).then(res => res.data)
  }
}
