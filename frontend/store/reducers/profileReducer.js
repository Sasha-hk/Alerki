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

        default:
            return state
    }
}


export default profileReducer
