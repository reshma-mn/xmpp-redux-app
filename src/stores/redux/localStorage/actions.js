
import * as types from './actionTypes'
const DOMAIN = "pia3264.pitsolutions.com";

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
let db;




function _userForName(name){
    return name + '@' + DOMAIN;
}


export const loadAndQueryDB = (user) => {
    return (dispatch) => {
      dispatch(loadingUserList())
      console.log("Plugin integrity check ...");
        SQLite.echoTest().then(() => {
            console.log("Integrity check passed ...")
            console.log("Opening database ...")
            SQLite.openDatabase({name : "testDB.db", createFromLocation : 1}).then((DB) => {
                db = DB;
                console.log("Database OPEN");
                db.transaction((tx) => { 
                    console.log("doit");
                tx.executeSql('CREATE TABLE IF NOT EXISTS '+user+'( '
                    + 'friends VARCHAR(55) NOT NULL);')
                    .catch((error) => {  
                    console.log(error) 
                });
                // tx.executeSql('DROP TABLE '+user+';');
                // tx.executeSql('INSERT INTO '+user+' (friends) VALUES ("Denver");');
                // tx.executeSql('INSERT INTO '+user+' (friends) VALUES ("Arun");');
                tx.executeSql('SELECT * FROM '+ user ,[], (tx, results) => {
                    console.log("results"+results.rows.length);
                    dispatch(sucessUserList());
                    for(i=0;i<results.rows.length;i++){
                        dispatch(showingUserList(results.rows.item(i).friends))
                    }
                    
                  });
                });
            }).catch((error) => {
                console.log(error);
            });

        }).catch(error => {
            console.log("echoTest failed - plugin not functional");
        });
    }
  }

  export const addNewFriend = (table_name,user) => {
    return (dispatch) => {
        db.transaction((tx) => { 
            console.log(table_name+ user);
        tx.executeSql('INSERT INTO '+table_name+' (friends) VALUES ("'+user+'");');
        dispatch(showingUserList(user))
        });

    }
  }

  export const saveMessagesToDb = (sender,reciever,message,time) => {
    return (dispatch) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS messages( '
                    + 'sender VARCHAR(55) NOT NULL',
                    + 'reciever VARCHAR(55) NOT NULL',
                    + 'message VARCHAR(55) NOT NULL',
                    + 'time VARCHAR(55) NOT NULL',
                    ');')
                    .catch((error) => {  
                    console.log(error) 
                });
        tx.executeSql('INSERT INTO messages (sender, reciever, message, time) VALUES ("reshma", "gokul", "Goodmorning", "01:00");');

    }


  export const loadMessagesFromDb = (user,remote) => {
    return (dispatch) => {
        tx.executeSql('SELECT * FROM messages WHERE (sender = "'+user+'" AND reciever = "'+remote+'") OR (reciever = "'+user+'" AND sender = "'+remote+'")',[], (tx, results) => {
            console.log("results"+results.rows.length);
            dispatch(sucessUserList());
            for(i=0;i<results.rows.length;i++){
                console.log(results.rows.item(i).sender)
                // dispatch(showingUserList(results.rows.item(i).friends))
            }
            
          });

    }
}



// function sendMessage(from, to, msg){
//     console.log(remote);
//     XMPP.message(msg.trim(), _userForName(to))
// }

// function onReceiveMessage({from, body}){
//     console.log("onReceiveMessage")

//     // var name = from.match(/^([^@]*)@/)[1];
//     // this.conversation.unshift({own:false, text:body});
//     console.log(from+" "+ body)
//     dispatch(loadMessagesSuccess(body,"10:00",false))
// }

// export const send = (from, to, msg) => {
//     console.log(from+ to+ msg);
  
      
      
//     return (dispatch) => {
//       // dispatch(sessionLoading())
//     //   console.log("loged in..... "+ details.user);
//       this.dispatch = dispatch;
//       sendMessage(from, to, msg);
//       dispatch(loadMessagesSuccess(msg,"10:00",true))
//     }
//   }


  const loadingUserList = () => ({
    type: types.USERS_LIST_LOADING,
  })
  const sucessUserList = () => ({
    type: types.USERS_LIST_SUCCESS,
  })
  const showingUserList = (user) => ({
    type: types.USERS_LIST_SHOW,
    user
  })
  const updateUserList = (user) => ({
    type: types.USERS_LIST_UPDATE,
    user
  })

//   const loadMessagesSuccess = (message,time,own) => ({
//     type: types.CHAT_LOAD_MESSAGES_SUCCESS,
//     message,
//     time,
//     own
//   })
