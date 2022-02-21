import * as types from '../types/appointmentTypes'
import api from '../../http'
import {
  makeAction,
  makeActionWithPayload,
} from '../../utils/createAction.js'


// upload appointment
const upload = () => {
  return async dispatch => {
    dispatch(makeAction(types.APPOINTMENT_UPLOAD))

    await api({
      method: 'get',
      url: '/profile/master/from-now',
      query: {
        now: new Date(),
      },
    })
      .then(r => { 
        dispatch(makeActionWithPayload(types.APPOINTMENT_UPLOAD_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.APPOINTMENT_UPLOAD_ERROR, e?.response?.data))
      }) 
  }
}


// make appointment
const make = (data) => {
  return async dispatch => {
    dispatch(makeAction(types.APPOINTMENT_MAKE))

    await api({
      method: 'post',
      url: '/profile/make-appointment',
      query: data
    })
      .then(r => {
        dispatch(makeActionWithPayload(types.APPOINTMENT_MAKE_SUCCESS, r.data))
      })
      .catch(e => {
        dispatch(makeActionWithPayload(types.APPOINTMENT_MAKE_ERROR, e?.response?.data))
      }) 
  }
}


export default {
  upload,
  make,
}