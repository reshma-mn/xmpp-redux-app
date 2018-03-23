import React from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import {View, Text, ScrollView, TextInput, ListView, Dimensions, TouchableOpacity}  from 'react-native';
import styles from './styles';
// import Button from 'react-native-button';
import ActivityIndicator from './ActivityIndicator';
import xmpp from '../stores/XmppStore';

import { restoreSession } from '../stores/redux/session'
import { loginUser } from '../stores/redux/session'
import XMPP from 'react-native-xmpp';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
   
    
  }
  // compnentDidMount(){
  //   XMPP.trustHosts(['pia3264.pitsolutions.com']);
  //   XMPP.connect("test@PIA3264.pitsolutions.com","test");
  // }

//   showText = () => {
//     this.setState({printText:true});
//  }

 
  render(){
    return (
        //   <View><Text>hiiii</Text></View>
      <View style={[styles.container,{alignItems:'center'}]}>
        {xmpp.loginError && <Text style={{color:'red'}}>{xmpp.loginError}</Text>}
        <Text style={styles.categoryLabel}>Please enter username and password</Text>
        
        <View style={styles.row}>
          <TextInput style={styles.rowInput}
                     autoCorrect={false}
                     autoCapitalize="none"
                     autoFocus={true}
                     placeholder="username (@pia3264.pits.com)"
                     value={this.state.user}
                     onChangeText={(user)=>this.setState({user})}
          />
        </View>
        <View style={styles.lastRow}>
          <TextInput style={styles.rowInput}
                     autoCorrect={false}
                     autoCapitalize="none"
                     placeholder="Password"
                     value={this.state.password}
                     onChangeText={(password)=>this.setState({password})}
          />
        </View>
        <View style={styles.button}><TouchableOpacity 
            onPress={()=>{this.props.login(this.state)}}
            // onPress={() => this.showText() } 
            
            ><Text>Login</Text></TouchableOpacity></View>
            {this.state.printText && <Text> Printed text... </Text> }
        <ActivityIndicator active={xmpp.loading}/>
      
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.session.loading,
  logged: state.session.user != null,
})
 
const mapDispatchToProps = {
  load: restoreSession,
  login: loginUser
}
 
Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
  load: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)