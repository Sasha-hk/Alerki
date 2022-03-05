import {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import userReducer from './userReducer'
import appointmentReducer from './appointmentReducer'
import CAPReducer from './CAPReducer'


const rootReducer = combineReducers({
    appointment: appointmentReducer,
    cap: CAPReducer,
    profile: profileReducer,
    user: userReducer,
})


export default rootReducer
