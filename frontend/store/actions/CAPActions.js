import * as types from '../types/CAPTypes'
import api from '../../http'
import {
  makeAction,
  makeActionWithPayload,
} from '../../utils/createAction.js'


// update appointment
const updateAppointment = (payload) => {
  return makeActionWithPayload(types.CAP_UPDATE_APPOINTMENT, payload)
}

// upload services
const uploadServices = () => {
  return async dispatch => {
    dispatch(makeAction(types.CAP_SERVICE_UPLOAD))
    
    await api({
      method: 'get',
      url: '/services/',
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.CAP_SERVICE_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response || e)
        dispatch(makeActionWithPayload(types.CAP_SERVICE_UPLOAD_ERROR, e?.response?.data))
      })
  }
}

// find services
const findServices = (querys = {name: null, limit: 25, page: 0}) => {
  return async dispatch => {
    dispatch(makeAction(types.CAP_SERVICE_FIND))
    await api({
      method: 'get',
      url: '/services/find',
      params: querys,
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.CAP_SERVICE_FIND_SUCCESS, r.data))
      })
      .catch(e => {
        console.log(e.response || e)
        dispatch(makeActionWithPayload(types.CAP_SERVICE_FIND_ERROR, e?.response?.data))
      })
  }
}

// find masters
const uploadMasters = ({
  serviceID = 1,
  limit = 25,
  page = 0
}) => {
  return async dispatch => {
    dispatch(makeAction(types.CAP_MASTER_UPLOAD))

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
        dispatch(makeActionWithPayload(types.CAP_MASTER_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.CAP_MASTER_UPLOAD_ERROR, e?.response?.data))
      })
  }
}

// supplement masters list
const supplementMasters = ({
  serviceID = 1,
  limit = 25,
  page = 0
}) => {
  return async dispatch => {
    dispatch(makeAction(types.CAP_MASTER_SUPPLEMENT))

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
        dispatch(makeActionWithPayload(types.CAP_MASTER_SUPPLEMENT_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.CAP_MASTER_SUPPLEMENT_ERROR, e?.response?.data))
      })
  }
}

// upload schdule
const uploadSchedule = ({
  year,
  month,
  masterID,
}) => {
  return async dispatch => {
    dispatch(makeAction(types.CAP_SCHEDULE_UPLOAD))

    await api({
      method: 'get',
      url: '/profile/get-schedule',
      params: {
        year,
        month,
        master_id: masterID,
      }
    })
      .then(r => { 
        dispatch(makeActionWithPayload(types.CAP_SCHEDULE_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.CAP_SCHEDULE_UPLOAD_ERROR, e?.response?.data))
      })
  }
}


export default {
  updateAppointment,
  uploadServices,
  findServices,
  uploadMasters,
  supplementMasters,
  uploadSchedule,
}
