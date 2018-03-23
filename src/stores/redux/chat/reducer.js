import * as types from './actionTypes'
 
const initialState = {
  sending: false,
  sendingError: null,
  message: '',
  messages: [],
  loadMessagesError: null
}
 
const chat = (state = initialState, action) => {
  switch(action.type) {
    case types.CHAT_MESSAGE_LOADING:
      return { ...state, sending: true, sendingError: null }
    case types.CHAT_MESSAGE_ERROR:
      return { ...state, sending: false, sendingError: action.error }
    case types.CHAT_MESSAGE_SUCCESS:
      return { ...state, sending: false, sendingError: null, message: '' }
    case types.CHAT_MESSAGE_UPDATE:
      return { ...state, sending: false, message: action.text, sendingError: null }
    case types.CHAT_LOAD_MESSAGES_SUCCESS:
        var copy = Object.assign({}, {message: action.message, sendTime: action.time, own: action.own});
        console.log(copy);
    //   state.messages.push({message: action.message, sendTime: action.time})
      return { ...state, messages: [copy, ...state.messages], loadMessagesError: null }
    case types.CHAT_LOAD_MESSAGES_ERROR:
      return { ...state, messages: null, loadMessagesError: action.error }
    default:
      return state
  }
}
 
export default chat