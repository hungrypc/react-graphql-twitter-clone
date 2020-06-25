import { combineReducers } from 'redux';
import callsInProgress from './callsInProgress'
import authReducer from './authReducer'
import userProfileData from './userProfileDataReducer'


export default combineReducers({
  auth: authReducer,
  callsInProgress,
  userProfileData
});