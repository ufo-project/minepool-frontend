import * as API from './'
export default {
  getLine: params => {
    return API.GET('/minerrewardinfo', params)
  },
  getTarget: params => {
    return API.GET('/minerinfo', params)
  }
}
