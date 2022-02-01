import axios from 'axios'
import * as types from '../types/profileTypes'


const API_URL = process.env.API_URL

const makeAction = (action) => {
    return {
        type: action
    }
}
const makeActionWithPayload = (action, payload) => {
    return {
        type: action,
        payload
    }
}

// register
export const register = ({email, username, password}) => {
    return async dispatch => {
        dispatch(makeAction(PROFILE_REGISTER))
        
        await axios({
            method: 'get',
            url: API_URL + '/auth/register'
        })
            .then(r => {
                dispatch(makeActionWithPayload(types.PROFILE_REGISTER_SUCCESS, r.data))
            })
            .catch(e => {
                dispatch(makeAction(types.PROFILE_REGISTER_ERROR))
            }) 
    }
}

// log-in
export const logIn = ({email, username, password}) => {
    return async dispatch => {
        dispatch(makeAction(PROFILE_LOGIN))
        
        await axios({
            method: 'get',
            url: API_URL + '/auth/log-in',
            body: {
                email,
                username,
                password,
            }
        })
            .then(r => {
                dispatch(makeActionWithPayload(types.PROFILE_LOGIN_SUCCESS, r.data))
            })
            .catch(e => {
                dispatch(makeAction(types.PROFILE_LOGIN_ERROR))
            }) 
    }
}
