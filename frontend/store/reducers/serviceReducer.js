import * as types from '../types/serviceTypes'


const defaultServiceState = {
  services: [],
  loading: false,
  error: false,
  errors: null,
}

const serviceReducer = (state = defaultServiceState, action) => {
  switch (action.type) {
    // upload
    case types.SERVICE_UPLOAD:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.SERVICE_UPLOAD_SUCCESS:
      return {
        ...state,
        services: [
          ...state.services,
          ...action.payload,
        ],
        loading: false,
        error: false,
        errors: null,
      }
    
    case types.SERVICE_UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.payload,
      }

    // upload
    case types.SERVICE_FIND:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.SERVICE_FIND_SUCCESS:
      return {
        ...state,
        services: [
          ...state.services,
          ...action.payload,
        ].filter(unique),
        loading: false,
        error: false,
        errors: null,
      }
    
    case types.SERVICE_FIND_ERROR:
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


export default serviceReducer
