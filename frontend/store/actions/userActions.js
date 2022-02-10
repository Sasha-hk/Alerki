import * as types from '../types/userTypes'
import api from '../../http'
import {
  makeAction,
  makeActionWithPayload,
} from '../../utils/createAction.js'


// upload
const upload = () => {
  return async dispatch => {
    dispatch(makeAction(types.USER_UPLOAD))

    await api({
      method: 'get',
      url: '/auth/user'
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.USER_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response.data)
        dispatch(makeActionWithPayload(types.USER_UPLOAD_ERROR, e?.response?.data))
      }) 
  }
}

// update
const update = (updateData) => {
  return async dispatch => {
    dispatch(makeAction(types.USER_UPLOAD))

    await api({
      method: 'patch',
      url: '/profile/update',
      data: updateData,
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.USER_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response.data)
        dispatch(makeActionWithPayload(types.USER_UPLOAD_ERROR, e?.response?.data))
      }) 
  }
}


export default {
  upload,
  update,
}
