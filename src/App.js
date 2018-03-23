import React from 'react';
// import { StackNavigator } from 'react-navigation'

import XMPP from 'react-native-xmpp';
import { Provider } from 'react-redux'

import { configureStore } from './stores/redux'

const store = configureStore()
// import {Router, Switch, Scene} from 'react-native-mobx';
import RootApp from './components/RootApp';
// import Login from './components/Login';
// import MyActivityIndicator from './components/ActivityIndicator';
// import xmpp from './stores/XmppStore';
import {View, Text, ScrollView, TextInput, ListView, Dimensions}  from 'react-native';

XMPP.on('connect', onConnect);
XMPP.on('error', onError);

function onConnect() {
  console.log("Connected11")
}

function onError() {
  console.log("Connection Error")
}
export default class App extends React.Component {
 constructor(props){
   super(props)
  XMPP.trustHosts(['pia3264.pitsolutions.com']);
 }

  render() {
    return (
      // <View><Text>hello</Text></View>
      <Provider store={store}>
          <RootApp />
      </Provider>
      
      // <MyActivityIndicator active = {true} />
      // <Router xmpp={xmpp}>
      //       <Scene key="main" tabs component={Switch} selector={()=>!xmpp.logged ? 'login' : 'conversation'}>
      //         <Scene key="login" component={Login} title="Login"/>
      //         <Scene key="conversation" component={Conversation}/>
      //       </Scene>
      //   </Router>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
