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

// register
const register = ({email, username, profileType, password}) => {
    return async dispatch => {
        dispatch(makeAction(types.PROFILE_REGISTER))
        
        await api({
            method: 'post',
            url: '/auth/register',
            data: {
                email,
                username,
                password,
                profileType,
            }
        })
            .then(r => { 
                dispatch(makeActionWithPayload(types.PROFILE_REGISTER_SUCCESS, r.data))
                Router.push('/')
            })
            .catch(e => {
                dispatch(makeActionWithPayload(types.PROFILE_REGISTER_ERROR, e?.response?.data))
            }) 
    }
}

// log-in
const logIn = ({email, username, password}) => {
    return async dispatch => {
        dispatch(makeAction(types.PROFILE_LOGIN))
        
        await api({
            method: 'post',
            url: '/auth/log-in',
            data: {
                email,
                username,
                password,
            }
        })
            .then(r => {
                dispatch(makeActionWithPayload(types.PROFILE_LOGIN_SUCCESS, r.data.userData))
                Router.push('/')
            })
            .catch(e => {
                dispatch(makeActionWithPayload(types.PROFILE_LOGIN_ERROR, e?.response?.data))
            }) 
    }
}

// with Google
const withGoogle = (code) => {
    return async dispatch => {
        dispatch(makeAction(types.PROFILE_WITH_GOOGLE))
        
        await api({
            method: 'get',
            url: '/auth/callback/google',
            params: {
                code,
            }
        })
            .then(r => {
                dispatch(makeActionWithPayload(types.PROFILE_WITH_GOOGLE_SUCCESS, r.data.userData))
                Router.push('/')
            })
            .catch(e => {
                dispatch(makeActionWithPayload(types.PROFILE_WITH_GOOGLE_ERROR, e?.response?.data))
            })
    }
}

export default {
    upload,
    register,
    logIn,
    withGoogle,
}
