import * as types from '../types/masterTypes'
import api from '../../http'
import {
  makeAction,
  makeActionWithPayload,
} from '../../utils/createAction.js'


// find masters
const upload = ({
  serviceID = 1,
  limit = 25,
  page = 0
}) => {
  return async dispatch => {
    dispatch(makeAction(types.MASTER_UPLOAD))

    await api({
      method: 'get',
      url: '/profile/find-master',
      params: {
        service_id: serviceID,
        limit,
        page,
      }
    })
      .then(r => { 
        dispatch(makeActionWithPayload(types.MASTER_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.MASTER_UPLOAD_ERROR, e?.response?.data))
      })
  }
}

// supplement masters list
const supplement = ({
  serviceID = 1,
  limit = 25,
  page = 0
}) => {
  return async dispatch => {
    dispatch(makeAction(types.MASTER_SUPPLEMENT))

    await api({
      method: 'get',
      url: '/profile/find-master',
      params: {
        service_id: serviceID,
        limit,
        page,
      }
    })
      .then(r => { 
        dispatch(makeActionWithPayload(types.MASTER_SUPPLEMENT_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.MASTER_SUPPLEMENT_ERROR, e?.response?.data))
      })
  }
}


export default {
  upload,
  supplement,
}
