import { combineReducers } from 'redux'
 
import session from './session'
import chat from './chat'
import users from './localStorage'
 
export default combineReducers({
  session,
  chat,
  users
})