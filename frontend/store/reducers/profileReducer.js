import * as types from '../types/profileTypes'


const defaultProfileState = {
    profile: {
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        pictureID: null,
        
        client: {
            id: null,
            available: null,
        },
        worker: {
            id: null,
            shortBiography: null,
            instagramProfile: null,
            available: null,
            workingStartTime: null,
            workingEndTime: null,
            weekendDaysID: null,
        },
    },
    loading: false,
    error: false,
    errorMessage: null,
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

        // register
        case types.PROFILE_REGISTER:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        
        case types.PROFILE_REGISTER_SUCCESS:
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

        case types.PROFILE_REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }
        
        // login
        case types.PROFILE_LOGIN:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        
        case types.PROFILE_LOGIN_SUCCESS:
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

        case types.PROFILE_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }

        // logout
        case types.PROFILE_LOGOUT:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        
        case types.PROFILE_LOGOUT_SUCCESS:
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

        case types.PROFILE_LOGOUT_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload,
            }

        // with Google
        case types.PROFILE_WITH_GOOGLE:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: null,
            }
        
        case types.PROFILE_WITH_GOOGLE_SUCCESS:
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

        case types.PROFILE_WITH_GOOGLE_ERROR:
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
