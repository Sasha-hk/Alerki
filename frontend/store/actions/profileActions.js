import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import api from '../../http'
import * as types from '../types/profileTypes'


const API_URL = process.env.API_URL

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
                dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_SUCCESS, r.data))
            })
            .catch(e => {
                dispatch(makeActionWithPayload(types.PROFILE_UPLOAD_ERROR, e?.response?.data))
            }) 
    }
}

export default {
    upload,
}
