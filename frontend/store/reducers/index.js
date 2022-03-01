import {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import userReducer from './userReducer'
import appointmentReducer from './appointmentReducer'
import CAPReducer from './CAPReducer'


const rootReducer = combineReducers({
    profile: profileReducer,
    user: userReducer,
    appointment: appointmentReducer,
    cap: CAPReducer,
})


export default rootReducer
