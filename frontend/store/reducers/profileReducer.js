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
    authenticated: false,
    liading: false,
    error: false,
    errorMessage: null,
}

const profileReducer = (state = defaultProfileState, action) => {
    switch (action.type) {
        case types.NAE_FAIL_ATTACHED_NEWS:
            return 1

        default:
            return state
    }
}


export default profileReducer