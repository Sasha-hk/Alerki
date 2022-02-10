import {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    profile: profileReducer,
    user: userReducer,
})


export default rootReducer
