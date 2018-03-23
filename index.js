import { AppRegistry } from 'react-native';
import App from './src/App';
AppRegistry.registerComponent('xmppchat', () => App);


// import React, {Component} from 'react';
// import {AppRegistry} from 'react-native';
// import {Router, Switch, Scene} from 'react-native-mobx';
// // import Conversation from './src/components/Conversation';
// // import Login from './src/components/Login';
// import xmpp from './src/stores/XmppStore';
// import {View, Text, ScrollView, TextInput, ListView, Dimensions}  from 'react-native';

// // Define all routes of the app
// class XmppDemo extends Component{
//   render() {
//       return (
//           <View>
//               <Text>hiii</Text>
//           </View>
          
//         //   <Router xmpp={xmpp}>
//         //     <Scene key="main" tabs component={Switch} selector={()=>!xmpp.logged ? 'login' : 'conversation'}>
//         //       <Scene key="login" component={Login} title="Login"/>
//         //       <Scene key="conversation" component={Conversation}/>
//         //     </Scene>
//         //   </Router>
//       );
//   }
// }

// AppRegistry.registerComponent('xmppchat', () => XmppDemo);