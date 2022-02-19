import * as types from '../types/profileTypes'


const defaultProfileState = {
  profile: {
    username: null,
    firstName: null,
    lastName: null,
    pictureID: null,
    clientID: null,
    masterID: null,
    profileType: null,
  },
  loading: false,
  error: false,
  errors: null,
}

const profileReducer = (state = defaultProfileState, action) => {
  switch (action.type) {
    // upload
    case types.PROFILE_UPLOAD:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }
    
    case types.PROFILE_UPLOAD_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
        loading: false,
        error: false,
        errorMessage: null,
      }

    case types.PROFILE_UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.payload,
      }

    // upload services
    case types.PROFILE_UPLOAD_SERVICES:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }
    
    case types.PROFILE_UPLOAD_SERVICES_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          master: {
            ...state.master,
            services: action.payload,
          }
        },
        loading: false,
        error: false,
        errors: null,
      }

    case types.PROFILE_UPLOAD_SERVICES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.payload,
      }

    // create service
    case types.USER_CREATE_SERVICE:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.USER_CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          master: {
            ...state.user.master,
            services: {
              ...state.user.master.services,
              ...action.payload,
            }
          }
        },
        loading: false,
        error: false,
        errors: null,
      }

    case types.USER_CREATE_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.payload,
      }

    // delete service
    case types.USER_DELETE_SERVICE:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.USER_DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
        error: false,
        errors: null,
      }

    case types.USER_DELETE_SERVICE_ERROR:
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


export default profileReducer
