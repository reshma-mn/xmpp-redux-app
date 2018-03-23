import React from 'react';
import { StackNavigator } from 'react-navigation'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Conversation from './Conversation';
import Login from './Login';
import MyActivityIndicator from './ActivityIndicator';
// import xmpp from './stores/XmppStore';
import {View, Text, ScrollView, TextInput, ListView, Dimensions}  from 'react-native';


import { restoreSession } from '../stores/redux/session'


class RootApp extends React.Component {
  constructor(props){
    super(props);
  }
  content = () => {
    if(this.props.loading){
      return(<MyActivityIndicator  active = {true}/>);
    }
    else{
      if(this.props.logged){
        return(<Conversation />);
      }
      else{
        return(<Login />);
      }
    }
    
  }

  render() {
    //   console.log(this.props.loading+" "+this.props.logged);
    return (
    //   <View><Text>hello</Text></View>
          <View style={{flex:1}}>{this.content()}</View>
      
        
      // <Router xmpp={xmpp}>
      //       <Scene key="main" tabs component={Switch} selector={()=>!xmpp.logged ? 'login' : 'conversation'}>
      //         <Scene key="login" component={Login} title="Login"/>
      //         <Scene key="conversation" component={Conversation}/>
      //       </Scene>
      //   </Router>
    );
  }
}


const mapStateToProps = state => ({
    loading: state.session.loading,
    logged: state.session.user != null,
  })
   
  const mapDispatchToProps = {
    load: restoreSession
  }
   
  RootApp.propTypes = {
    loading: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(RootApp)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
