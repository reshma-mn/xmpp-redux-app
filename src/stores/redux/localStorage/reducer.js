import * as types from './actionTypes'
 
const initialState = {
  loading: false,
  isSucess: true,
  users: [],
  user:""
}
const users = (state = initialState, action) => {
  switch(action.type) {
    case types.USERS_LIST_LOADING:
      return { ...state, loading: true, isSucess: false }
    case types.USERS_LIST_SUCCESS:
      return { ...state, loading: false, isSucess: true}
    case types.USERS_LIST_ERROR:
      return { ...state,loading: false, isSucess: false}
    case types.USERS_LIST_SHOW:
      return { ...state, loading: false, users: [...state.users, action.user]}
    default:
      return state
  }
}
 
export default users