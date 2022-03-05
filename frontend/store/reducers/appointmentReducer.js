import * as types from '../types/appointmentTypes'


const defaultAppointmentState = {
  appointments: [],
  isLoading: false,
  error: false,
  errors: null,
}

const appointmentReducer = (state = defaultAppointmentState, action) => {
  switch (action) {
    // upload appointments
    case types.APPOINTMENT_UPLOAD:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.APPOINTMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        appointment: [
          state.appointments,
          action.payload,
        ],
        loading: false,
        error: false,
        errors: null,
      }

    case types.APPOINTMENT_UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.payload,
      }

    // make appointment
    case types.APPOINTMENT_MAKE:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.APPOINTMENT_MAKE_SUCCESS:
      return {
        ...state,
        appointment: [
          state.appointments,
          action.payload,
        ],
        loading: false,
        error: false,
        errors: null,
      }


    case types.APPOINTMENT_MAKE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.payload,
      }

    default:
      return state
  }
}


export default appointmentReducer
