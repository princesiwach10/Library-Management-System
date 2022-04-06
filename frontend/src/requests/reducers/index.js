import { combineReducers } from 'redux'
import authReducer from './auth'
import userReducer from './user'
import libraryReducer from './library'

export default combineReducers({
    authReducer,
    userReducer,
    libraryReducer,
})