import * as types from '../types/userTypes'
import api from '../../http'
import {
  makeAction,
  makeActionWithPayload,
} from '../../utils/createAction.js'
import Cookies from 'js-cookie'


// upload
const upload = () => {
  return async dispatch => {
    dispatch(makeAction(types.USER_UPLOAD))
    
    await api({
      method: 'get',
      url: '/auth/user',
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.USER_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
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
        dispatch(makeActionWithPayload(types.USER_UPLOAD_ERROR, e?.response?.data))
      }) 
  }
}

// create service
const createService = (newServiceData) => {
  return async dispatch => {
    dispatch(makeAction(types.USER_UPLOAD))

    await api({
      method: 'post',
      url: '/profile/create/service',
      data: newServiceData,
    })
      .then(r => {
        console.log(r)
        dispatch(makeActionWithPayload(types.USER_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response.data)
        dispatch(makeActionWithPayload(types.USER_UPLOAD_ERROR, e?.response?.data))
      }) 
  }
}

// update service
const updateService = (updateData) => {
  return async dispatch => {
    dispatch(makeAction(types.USER_UPLOAD))

    await api({
      method: 'patch',
      url: '/profile/update/service',
      data: updateData,
    })
      .then(r => {
        console.log(r)
        dispatch(makeActionWithPayload(types.USER_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response.data)
        dispatch(makeActionWithPayload(types.USER_UPLOAD_ERROR, e?.response?.data))
      }) 
  }
}

// become client
const becomeClient = () => {
  return async dispatch => {
    dispatch(makeAction(types.USER_BECOME_CLIENT))

    await api({
      method: 'patch',
      url: '/profile/become-client',
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.USER_BECOME_CLIENT_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.USER_BECOME_CLIENT_ERROR, e?.response?.data))
      }) 
  }
}

// become master
const becomeMaster = () => {
  return async dispatch => {
    dispatch(makeAction(types.USER_BECOME_MASTER))

    await api({
      method: 'patch',
      url: '/profile/become-master',
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.USER_BECOME_MASTER_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.USER_BECOME_MASTER_ERROR, e?.response?.data))
      })
  }
}


export default {
  upload,
  update,
  createService,
  updateService,
  becomeMaster,
  becomeClient,
}
