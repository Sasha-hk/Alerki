import * as types from '../types/userTypes'


const defaultUserState = {
  user: {
    id: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    profileType: null, 
  },
  loading: false,
  error: false,
  errors: null,
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    // upload
    case types.USER_UPLOAD:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.USER_UPLOAD_SUCCESS:
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
    
    case types.USER_UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errors: action.payload,
      }

    // update
    case types.USER_UPDATE:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }

    case types.USER_UPDATE_SUCCESS:
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

    case types.USER_UPDATE_ERROR:
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


export default userReducer
