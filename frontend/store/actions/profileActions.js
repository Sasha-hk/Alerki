import { useSelector } from 'react'
import api from '../../http'
import * as types from '../types/profileTypes'


const makeAction = (action) => {
    return {
        type: action,
    }
}
const makeActionWithPayload = (action, payload) => {
    return {
        type: action,
        payload,
    }
}

// upload profile
const upload = ({username}) => {
    return async dispatch => {
        dispatch(makeAction(types.PROFILE_UPLOAD))

        await api({
            method: 'get',
            url: '/profile/' + username
        })
            .then(r => { 
                console.log(r.data)
                dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_SUCCESS, r.data))
            })
            .catch(e => {
                dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_ERROR, e?.response?.data))
            }) 
    }
}

// upload services
const updaloadServices = () => {
    return async dispatch => {
        const profile = useSelector(store => store.profile)

        dispatch(makeAction(types.PROFILE_UPLOAD_SERVICES))

        await api({
            method: 'get',
            url: '/profile/services' + profile.profile.workerID,
        })
            .then(r => { 
                dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_SERVICES_SUCCESS, r.data))
            })
            .catch(e => {
                dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_SERVICES_ERROR, e?.response?.data))
            }) 
    }
}

export default {
    upload,
}
