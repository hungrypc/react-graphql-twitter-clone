import { combineReducers } from 'redux';
import callsInProgress from './callsInProgress'
import authReducer from './authReducer'


export default combineReducers({
  auth: authReducer,
  callsInProgress
});