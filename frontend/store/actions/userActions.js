import * as types from '../types/userTypes'
import * as profileTypes from '../types/profileTypes'
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
    dispatch(makeAction(profileTypes.PROFILE_CREATE_SERVICE))

    await api({
      method: 'post',
      url: '/profile/create/service',
      data: newServiceData,
    })
      .then(r => {
        dispatch(makeActionWithPayload(profileTypes.PROFILE_CREATE_SERVICE_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(profileTypes.PROFILE_CREATE_SERVICE_ERROR, e?.response?.data))
      })
  }
}

// update service
const updateService = (updateData) => {
  return async dispatch => {
    dispatch(makeAction(profileTypes.PROFILE_UPDATE_SERVICE))

    await api({
      method: 'patch',
      url: '/profile/update/service',
      data: updateData,
    })
      .then(r => {
        console.log(r.data)
        dispatch(makeActionWithPayload(profileTypes.PROFILE_UPDATE_SERVICE_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(profileTypes.PROFILE_UPDATE_SERVICE_ERROR, e?.response?.data))
      }) 
  }
}

// delete service
const deleteService = ({id}) => {
  return async dispatch => {
    dispatch(makeAction(profileTypes.PROFILE_DELETE_SERVICE))

    await api({
      method: 'delete',
      url: '/profile/service',
      data: {id},
    })
      .then(async (r) => {
        dispatch(makeActionWithPayload(profileTypes.PROFILE_DELETE_SERVICE_SUCCESS, id))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(profileTypes.PROFILE_DELETE_SERVICE_ERROR, e?.response?.data))
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
  deleteService,
  becomeMaster,
  becomeClient,
}
