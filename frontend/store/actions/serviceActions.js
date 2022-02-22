import * as types from '../types/serviceTypes'
import api from '../../http'
import {
  makeAction,
  makeActionWithPayload,
} from '../../utils/createAction.js'


// upload services
const upload = () => {
  return async dispatch => {
    dispatch(makeAction(types.SERVICE_UPLOAD))
    
    await api({
      method: 'get',
      url: '/services/',
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.SERVICE_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response || e)
        dispatch(makeActionWithPayload(types.SERVICE_UPLOAD_ERROR, e?.response?.data))
      })
  }
}

// find services
const find = (querys) => {
  return async dispatch => {
    dispatch(makeAction(types.SERVICE_FIND))
    
    await api({
      method: 'get',
      url: '/services/find',
      props: querys,
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.SERVICE_FIND_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response || e)
        dispatch(makeActionWithPayload(types.SERVICE_FIND_ERROR, e?.response?.data))
      })
  }
}


export default {
  upload,
  find,
}