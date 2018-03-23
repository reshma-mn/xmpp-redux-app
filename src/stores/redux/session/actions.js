import XMPP from 'react-native-xmpp';
import * as types from './actionTypes'

var errorMessage="";
const DOMAIN = "pia3264.pitsolutions.com";

XMPP.on('loginError', onLoginError);
XMPP.on('error', onError);
XMPP.on('disconnect', onDisconnect);
XMPP.on('login', onLogin);

//XMPP.on('message', onReceiveMessage);
// default values
// XMPP.trustHosts(['pia3264.pitsolutions.com']);
user = '';

 
    
function _userForName(name){
        return name + '@' + DOMAIN;
    }

    // sendMessage(message){
    //     if (!this.remote || !this.remote.trim()){
    //         console.error("No remote username is defined");
    //     }
    //     if (!message || !message.trim()){
    //         return false;
    //     }
    //     // add to list of messages
    //     this.conversation.unshift({own:true, text:message.trim()});
    //     // empty sent message
    //     this.error = null;
    //     // send to XMPP server
    //     XMPP.message(message.trim(), this._userForName(this.remote))
    // }

    // onReceiveMessage({from, body}){
    //     console.log("onReceiveMessage")
    //     // extract username from XMPP UID
    //     if (!from || !body){
    //         return;
    //     }
    //     var name = from.match(/^([^@]*)@/)[1];
    //     this.conversation.unshift({own:false, text:body});
    // }

    function onLoginError(){
        
        errorMessage = "Cannot authenticate, please use correct local username";
        console.log("errorr..."+errorMessage);
        
        // this.loading = false;
        // this.conversation.replace([]);
       
    }

    function onError(message){

        this.error = message;
    }

    function onDisconnect(message){
        this.logged = false;
        this.loginError = message;
    }

    function onLogin(){
        dispatch(sessionSuccess(this.user))
        console.log("LOGGED INNNN!...");
        // this.conversation.replace([]);
        // this.loading = false;
        // this.loginError = null;
        // this.logged = true;
    }

    function login({user, password}){
        console.log(user+ " " +password);
        
        if (!user || !user.trim()){
            this.loginError = "Local username should not be empty";
            // onError(this.loginError);
        } else if (!password || !password.trim()){
            this.loginError = "Remote username should not be empty";
            // onError(this.loginError);
        } else {
            errorMessage = null;
            console.log(_userForName(user))
            XMPP.connect(_userForName(user),password);
            this.user = user;

        }

    }

    

function disconnect() {
        XMPP.disconnect();
    }




export const errorSession = () => {

    
  return (dispatch) => {
    console.log("Error...")
        // dispatch(sessionLoading())
//     dispatch(sessionRestoring())

//     let unsubscribe = firebaseService.auth()
//       .onAuthStateChanged(user => {
//         if (user) {
//           dispatch(sessionSuccess(user))
//           unsubscribe()
//         } else {
//           dispatch(sessionLogout())
//           unsubscribe()
//         }
//       })
  }
}
export const restoreSession = (message) => {

    
  return (dispatch) => {
    console.log(message);
        // dispatch(sessionError())
//     dispatch(sessionRestoring())

//     let unsubscribe = firebaseService.auth()
//       .onAuthStateChanged(user => {
//         if (user) {
//           dispatch(sessionSuccess(user))
//           unsubscribe()
//         } else {
//           dispatch(sessionLogout())
//           unsubscribe()
//         }
//       })
  }
}

export const loginUser = (details) => {
  console.log("inside this...");

    
    
  return (dispatch) => {
    // dispatch(sessionLoading())
    console.log("loged in..... "+ details.user);
    this.dispatch = dispatch;
    login(details)
    // console.log("check it"+errorMessage)
    // if(errorMessage){
    //   dispatch(sessionLoading())
    // }
    // else{
    //   dispatch(sessionSuccess(details.user))
    // }
    // dispatch(sessionSuccess(details.user))
//     dispatch(sessionLoading())

//     firebaseService.auth()
//       .signInWithEmailAndPassword(email, password)
//       .catch(error => {
//         dispatch(sessionError(error.message))
//       })

//     let unsubscribe = firebaseService.auth()
//       .onAuthStateChanged(user => {
//         if (user) {
//           dispatch(sessionSuccess(user))
//           unsubscribe()
//         }
//       })
  }
}

// export const signupUser = (email, password) => {
//   return (dispatch) => {
//     dispatch(sessionLoading())

//     firebaseService.auth()
//       .createUserWithEmailAndPassword(email, password)
//       .catch(error => {
//         dispatch(sessionError(error.message));
//       })

//     let unsubscribe = firebaseService.auth()
//       .onAuthStateChanged(user => {
//         if (user) {
//           dispatch(sessionSuccess(user))
//           unsubscribe()
//         }
//       })
//   }
// }

// export const logoutUser = () => {
//   return (dispatch) => {
//     dispatch(sessionLoading())

//     firebaseService.auth()
//       .signOut()
//       .then(() => {
//         dispatch(sessionLogout())
//       })
//       .catch(error => {
//         dispatch(sessionError(error.message))
//       })
//   }
// }

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
})

const sessionLoading = () => ({
  type: types.SESSION_LOADING
})

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
})

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})