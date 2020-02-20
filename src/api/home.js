import * as API from './'
export default {
  getList: params => {
    return API.GET('/blocksinfo', params)
  },
  getTarget: params => {
    return API.GET('/totalinfo', params)
  },
  getLine: params => {
    return API.GET('/powerdiffinfo', params)
  },
  getPie: params => {
    return API.GET('/rewardsinfo', params)
  }
}
