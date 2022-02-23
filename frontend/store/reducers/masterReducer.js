import * as types from '../types/masterTypes'
import shiftObjects from '../../utils/shiftObjects'


const defaultMasterState = {
  masters: [],
  loading: false,
  error: false,
  errors: null,
}

const masterReducer = (state = defaultMasterState, action) => {
  switch (action.type) {
    // upload
    case types.MASTER_UPLOAD:
      return {
        ...state,
        loading: true,
        error: false,
        errors: null,
      }
    
    case types.MASTER_UPLOAD_SUCCESS:
      return {
        ...state,
        masters: shiftObjects([
          ...state.masters,
          ...action.payload,
        ], 'id'),
        loading: false,
        error: false,
        errors: null,
      }

    case types.MASTER_UPLOAD_ERROR:
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


export default masterReducer
