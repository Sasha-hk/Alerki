import * as types from '../types/CAPTypes'
import shiftObjects from '../../utils/shiftObjects'


// state patterns
const loadingState = {
  loading: true,
  error: false,
  errors: null,
}

const successState = {
  loading: false,
  error: false,
  errors: null,
}

const errorState = (errors) => {
  return {
    loading: false,
    error: true,
    errors: errors,
  }
}

// default state
const defaultCAPState = {
  services: {
    services: [],
    ...successState,
  },
  masters: {
    masters: [],
    ...successState,
  },
  schedule: {
    schedule: {},
    ...successState,
  },
  appointment: {
    date: null,
    serviceID: null,
    masterServiceID: null,
    masterID: null,
    appointmentStartTime: null,
  }
}

// update state
const updateAppointment = (state, data) => {
  return {...Object.assign(state, {
    appointment: data,
  })}
}

const updateServices = (state, data) => {
  return {...Object.assign(state, {
    services: data,
  })}
}

const updateMasters = (state, data) => {
  return {...Object.assign(state, {
    masters: data
  })}
}

const updateSchedule = (state, data) => {
  return {...Object.assign(state, {
    schedule: data
  })}
}

// generics
const genServicesError = (state, error) => {
  return {...Object.assign(state, {
    services: {
      ...errorState(error)
    }
  })}
}

const genMastersError = (state, error) => {
  return {...Object.assign(state, {
    masters: {
      ...errorState(error)
    },
  })}
}

const genScheduleError = (state, error) => {
  return {...Object.assign(state, {
    schedule: {
      ...errorState(error)
    }
  })}
}


const CAPReducer = (state = defaultCAPState, action) => {
  switch (action.type) {
    // appointment
    case types.CAP_UPDATE_APPOINTMENT:
      return updateAppointment(state, {
        date: action.payload
      })

    // services
    // upload
    case types.CAP_SERVICE_UPLOAD:
      return updateServices(state, {
        services: state.services.services,
        ...loadingState,
      })

    case types.CAP_SERVICE_UPLOAD_SUCCESS:
      return updateServices(state, {
        services: shiftObjects([
          ...state.services.services,
          ...action.payload,
        ], 'id'),
        ...successState,
      })
    
    case types.CAP_SERVICE_UPLOAD_ERROR:
      return genServicesError(state, action.payload)

    // find
    case types.CAP_SERVICE_FIND:
      return updateServices(state, {
        ...loadingState
      })

    case types.CAP_SERVICE_FIND_SUCCESS:
      return updateServices(state, {
        services: shiftObjects([
          ...state.services.services,
          ...action.payload,
        ], 'id'),
        ...loadingState
      })
    
    case types.CAP_SERVICE_FIND_ERROR:
      return genServicesError(state, action.payload)

    
    // masters
    // upload
    case types.CAP_MASTER_UPLOAD:
      return updateMasters(state, {
        ...loadingState,
      })
    
    case types.CAP_MASTER_UPLOAD_SUCCESS:
      return updateMasters(state, {
        masters: action.payload,
        ...successState,
      })

    case types.CAP_MASTER_UPLOAD_ERROR:
      return genMastersError(state, action.payload)

    // supplement
    case types.CAP_MASTER_SUPPLEMENT:
      return updateMasters(state, {
        ...loadingState,
      })
    
    case types.CAP_MASTER_SUPPLEMENT_SUCCESS:
      return updateMasters(state, {
        masters: shiftObjects([
          ...store.masters.masters,
          ...action.payload,
        ], 'id'),
        ...successState,
      })

    case types.CAP_MASTER_SUPPLEMENT_ERROR:
      return genMastersError(state, action.payload)

    
    // schedule
    // upload
    case types.CAP_SCHEDULE_UPLOAD:
      return updateSchedule(state, {
        ...loadingState,
      })
    
    case types.CAP_SCHEDULE_UPLOAD_SUCCESS:
      return updateSchedule(state, {
        schedule: action.payload,
        ...successState,
      })

    case types.CAP_SCHEDULE_UPLOAD_ERROR:
      return genScheduleError(state, action.payload)

    default:
      return state
  }
}


export default CAPReducer
