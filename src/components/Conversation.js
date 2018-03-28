import React from 'react';
import {View, Text, ScrollView, TextInput, Keyboard, ListView, Dimensions, TouchableOpacity}  from 'react-native';
import styles from './styles';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const height = Dimensions.get('window').height;
// import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
// import xmpp from '../stores/XmppStore';

import { send } from '../stores/redux/chat'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Conversation extends React.Component {
    // static title(props){
    //     return xmpp.remote;
    // }
    constructor(props) {
        super(props);
        this.state = {height:0}
    }
    componentWillMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }
    
    componentWillUnmount(){
        this.mounted = false;
        Keyboard.removeListener('keyboardWillShow');
        Keyboard.removeListener('keyboardWillHide');
    }
    keyboardWillShow (e) {
        if (this.mounted) this.setState({height: e.endCoordinates.height});
    }
    
    keyboardWillHide (e) {
        if (this.mounted) this.setState({height: 0});
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
         headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            },
        });
    

    render(){
    const { params } = this.props.navigation.state;
    const remote = params ? params.remote : null;
    console.log(this.props.user);
        console.log(this.props.messages)
        const dataSource = ds.cloneWithRows(this.props.messages);
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <ListView enableEmptySections
                        ref="messages"
                        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        dataSource={dataSource}
                        renderRow={(row) =>
                            <Text style={[styles.messageItem, {textAlign:row.own ? 'right':'left' }]}>{row.message}</Text>}
                        />
                </View>
                <View style={styles.messageBar}>
                    <View style={{flex:1}}>
                        <TextInput ref='message'
                                   value={this.state.message}
                                   onChangeText={(message)=>this.setState({message})}
                                   style={styles.message} placeholder="Enter message..."/>
                    </View>
                    <View style={styles.sendButton}>
                        <TouchableOpacity onPress={()=>{this.props.send(this.props.user,remote,this.state.message);this.setState({message:""})}} disabled={!this.state.message || !this.state.message.trim()}><Text>Send</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{height:this.state.height}}></View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    sending: state.chat.sending,
    messages: state.chat.messages,
    message: state.chat.message,
    loadMessagesError: state.chat.loadMessagesError,
    sendingError: state.chat.sendingError,
    user: state.session.user
  })
   
  const mapDispatchToProps = {
    send: send
  }
   
  Conversation.propTypes = {
    sending: PropTypes.bool.isRequired,
    loadMessagesError: PropTypes.bool,
    sendingError: PropTypes.bool,
    send: PropTypes.func.isRequired
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Conversation)