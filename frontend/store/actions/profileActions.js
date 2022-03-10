import * as types from '../types/profileTypes'
import api from '../../http'
import {
  makeAction,
  makeActionWithPayload,
} from '../../utils/createAction.js'


// upload profile
const upload = ({username}) => {
  return async dispatch => {
    dispatch(makeAction(types.PROFILE_UPLOAD))

    await api({
      method: 'get',
      url: '/profile/' + username,
    })
      .then(r => { 
        dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_ERROR, e?.response?.data))
      }) 
  }
}

// upload services
const updaloadServices = () => {
  return async dispatch => {
    dispatch(makeAction(types.PROFILE_UPLOAD_SERVICES))

    await api({
      method: 'get',
      url: '/profile/services',
    })
      .then(r => { 
        dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_SERVICES_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_SERVICES_ERROR, e?.response?.data))
      }) 
  }
}

// update
const update = ({
  username,
  firstName,
  lastName,
}) => {
  return async dispatch => {
    dispatch(makeAction(types.PROFILE_UPDATE))
    
    await api({
      method: 'patch',
      url: '/profile/update',
      data: {
        username,
        firstName,
        lastName,
      },
    })
      .then(r => { 
        dispatch(makeActionWithPayload(types.PROFILE_UPDATE_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.PROFILE_UPDATE_ERROR, e?.response?.data))
      }) 
  }
}


export default {
  upload,
  update,
}
