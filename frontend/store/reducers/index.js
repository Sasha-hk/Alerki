import {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import userReducer from './userReducer'
import appointmentReducer from './appointmentReducer'


const rootReducer = combineReducers({
    profile: profileReducer,
    user: userReducer,
    appointment: appointmentReducer,
})


export default rootReducer
