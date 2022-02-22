import {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import userReducer from './userReducer'
import appointmentReducer from './appointmentReducer'
import serviceReducer from './serviceReducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    user: userReducer,
    appointment: appointmentReducer,
    service: serviceReducer,
})


export default rootReducer
