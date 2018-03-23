import XMPP from 'react-native-xmpp';
import * as types from './actionTypes'
var remote="gokul"
var errorMessage="";
const DOMAIN = "pia3264.pitsolutions.com";

// XMPP.on('loginError', onLoginError);
// XMPP.on('error', onError);
// XMPP.on('disconnect', onDisconnect);
// XMPP.on('login', onLogin);

XMPP.on('message', onReceiveMessage);
// default values
// XMPP.trustHosts(['pia3264.pitsolutions.com']);
// user = '';

function _userForName(name){
    return name + '@' + DOMAIN;
}

function sendMessage(from, to, msg){
    console.log(remote);
    XMPP.message(msg.trim(), _userForName(to))
}

function onReceiveMessage({from, body}){
    console.log("onReceiveMessage")

    // var name = from.match(/^([^@]*)@/)[1];
    // this.conversation.unshift({own:false, text:body});
    console.log(from+" "+ body)
    dispatch(loadMessagesSuccess(body,"10:00",false))
}

export const send = (from, to, msg) => {
    console.log(from+ to+ msg);
  
      
      
    return (dispatch) => {
      // dispatch(sessionLoading())
    //   console.log("loged in..... "+ details.user);
      this.dispatch = dispatch;
      sendMessage(from, to, msg);
      dispatch(loadMessagesSuccess(msg,"10:00",true))
    }
  }

  const loadMessagesSuccess = (message,time,own) => ({
    type: types.CHAT_LOAD_MESSAGES_SUCCESS,
    message,
    time,
    own
  })
