import * as types from '../types/profileTypes'


const defaultProfileState = {
    profile: {
        username: null,
        firstName: null,
        lastName: null,
        pictureID: null,
        clientID: null,
        workerID: null,
        profileType: null,
    },
    loading: false,
    error: false,
    errorMessage: null,
    initRender: true,
}

const profileReducer = (state = defaultProfileState, action) => {
    switch (action.type) {
        // upload
        case types.PROFILE_UPLOAD:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
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
                errorMessage: action.payload,
            }

        // upload services
        case types.PROFILE_UPLOAD_SERVICES:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        
        case types.PROFILE_UPLOAD_SERVICES_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    worker: {
                        ...state.worker,
                        services: action.payload,
                    }
                },
                loading: false,
                error: false,
                errorMessage: null,
            }

        case types.PROFILE_UPLOAD_SERVICES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }

        case 'CLEAR':
            return defaultProfileState

        // update
        case types.PROFILE_UPDATE:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        
        case types.PROFILE_UPDATE_SUCCESS:
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

        case types.PROFILE_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }

        default:
            return state
    }
}


export default profileReducer
