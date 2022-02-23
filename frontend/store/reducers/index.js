import {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import userReducer from './userReducer'
import appointmentReducer from './appointmentReducer'
import serviceReducer from './serviceReducer'
import masterReducer from './masterReducer'


const rootReducer = combineReducers({
    profile: profileReducer,
    user: userReducer,
    appointment: appointmentReducer,
    service: serviceReducer,
    master: masterReducer,
})


export default rootReducer
