import React from 'react';

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { StackNavigator } from 'react-navigation'
import {Modal, View, Text, ScrollView,FlatList,  TextInput, ListView, Dimensions, TouchableOpacity, TouchableHighlight}  from 'react-native';
import styles from './styles';
// import Button from 'react-native-button';
import MyActivityIndicator from './ActivityIndicator';

import { loadAndQueryDB, addNewFriend } from '../stores/redux/localStorage'


class ChatFriends extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        modalVisible: false,
    };
    // localStorage.loadAndQueryDB("gokul")
    // .then(()=>{
    //     console.log("value..............")
    // })
    // function asyncFunc() {
    //     return new Promise(
    //         localStorage.loadAndQueryDB("gokul")
    //         );
    // }
    // 
    // localStorage.asyncFunc()
    // .then(result => {console.log(result)})
    // .catch(error => {console.log("error innn") });
    // localStorage.asyncFunc()
    // .then(x => console.log('Result: '+x));
    
    // async function hey() {
    //     const x = await localStorage.loadAndQueryDB("gokul"); // (A)
    //     console.log('Result: '+x); // (B)
    
        // Same as:
        // asyncFunc()
        // .then(x => console.log('Result: '+x));
    }
    componentDidMount(){

      console.log(this.props.logedUser);
      this.props.lodaDatabase(this.props.logedUser);
    }
  
    
  
  
  // compnentDidMount(){
  //   XMPP.trustHosts(['pia3264.pitsolutions.com']);
  //   XMPP.connect("test@PIA3264.pitsolutions.com","test");
  // }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  render(){
    console.log(this.props.loading);
    console.log(this.props.users);
    if(this.props.loading){
      return(
        <MyActivityIndicator  active = {true}/>
      )
    }
    
      return (
        //   <View><Text>hiiii</Text></View>
      <View style={[styles.container,{alignItems:'center', paddingTop: 0,}]}>
        
        {/* <View style={styles.rowList}>
          <Text>HEllooo</Text>
        </View> */}
        <FlatList
          style={{width:"100%"}}
          data={this.props.users}
          renderItem={({item}) =>
             <TouchableHighlight 
              style={styles.friendList}
              onPress={()=>{
                console.log("pressed"+ item)
                this.props.navigation.navigate('Conversation',{title: item,remote: item})
              }}>
                  <Text>{item}</Text>
             </TouchableHighlight>}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
          >
          <View style={styles.friendModalContainer}>
            <View style={styles.friendModalWrapper}>
            <View style={styles.modalInput}>
                <TextInput 
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoFocus={true}
                        placeholder="username (@pia3264.pits.com)"
                        value={this.state.user}
                        onChangeText={(friend)=>this.setState({friend})}
                 />
                 <View style={styles.modalButtons}>
                    <View style={styles.modalSaveButton}>
                        <TouchableOpacity
                        onPress={() => {
                        console.log("saved");
                        this.props.addNewFriend(this.props.logedUser,this.state.friend);
                        console.log("Users"+this.props.users)
                        this.setModalVisible(!this.state.modalVisible);
                        
                        }}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalCancelButton}>
                        <TouchableOpacity
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                 </View>
                
              
            </View>
                
            </View>
          </View>
        </Modal>



        <View style={styles.roundFixedButton}>
            <TouchableOpacity 
            // onPress={()=>{this.props.login(this.state)}}
            // onPress={() => this.showText() } 
            onPress={() => {
                this.setModalVisible(true);
              }}
            ><Text style={styles.buttonText}>Add Friends</Text>
            </TouchableOpacity>
        </View>
      
      </View>
    )
    }
    
  }


const mapStateToProps = state => ({
  loading: state.users.loading,
  isSucess: state.users.isSucess,
  users: state.users.users,
  user:state.users.user,
  logedUser: state.session.user,
  
})
 
const mapDispatchToProps = {
  lodaDatabase: loadAndQueryDB,
  addNewFriend: addNewFriend
}
 
ChatFriends.propTypes = {
  loading: PropTypes.bool.isRequired,
  isSucess: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatFriends)
