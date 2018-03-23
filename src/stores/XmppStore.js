import XMPP from 'react-native-xmpp';
const DOMAIN = "pia3264.pitsolutions.com";
const SCHEMA = "ios";
import {observable} from 'mobx';
import autobind from 'autobind';
import {loginUser} from './redux/session'
import {errorSession} from './redux/session'

import {onError} from './redux/session'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
@autobind
class XmppStore {
    @observable logged = false;
    @observable loading = false;
    @observable loginError = null;
    @observable error = null;
    @observable conversation = [];
    
    constructor() {
        // XMPP.trustHosts(['PIA3264.pits.com']);
        XMPP.on('loginError', this.onLoginError);
        XMPP.on('error', this.onError);
        XMPP.on('disconnect', this.onDisconnect);
        XMPP.on('login', this.onLogin);
        XMPP.on('message', this.onReceiveMessage);
        // default values
        XMPP.trustHosts(['pia3264.pitsolutions.com']);
        this.user = '';
        
    }
    
    _userForName(name){
        return name + '@' + DOMAIN;
    }

    sendMessage(message){
        if (!this.remote || !this.remote.trim()){
            console.error("No remote username is defined");
        }
        if (!message || !message.trim()){
            return false;
        }
        // add to list of messages
        this.conversation.unshift({own:true, text:message.trim()});
        // empty sent message
        this.error = null;
        // send to XMPP server
        XMPP.message(message.trim(), this._userForName(this.remote))
    }

    onReceiveMessage({from, body}){
        console.log("onReceiveMessage")
        // extract username from XMPP UID
        if (!from || !body){
            return;
        }
        var name = from.match(/^([^@]*)@/)[1];
        this.conversation.unshift({own:false, text:body});
    }

    onLoginError(){
        console.log("ERROR...");
        this.loginError = "Cannot authenticate, please use correct local username";
        this.props.error(this.loginError);
        // this.loading = false;
        // this.conversation.replace([]);
       
    }

    onErrorIt(message){

        this.error = message;
    }

    onDisconnect(message){
        this.logged = false;
        this.loginError = message;
    }

    onLogin(){
        console.log("LOGGED INNNN!");
        loginUser(this.user);
        // this.conversation.replace([]);
        // this.loading = false;
        // this.loginError = null;
        // this.logged = true;
    }

    login({user, password}){
        console.log(user+ " " +password);
        // this.user = user;
        if (!user || !user.trim()){
            this.loginError = "Local username should not be empty";
            // onError(this.loginError);
        } else if (!password || !password.trim()){
            this.loginError = "Remote username should not be empty";
            // onError(this.loginError);
        } else {
            this.loginError = null;
            console.log(this._userForName(this.user))
            XMPP.connect(this._userForName(this.user),password);
        }

    }

    disconnect() {
        XMPP.disconnect();
    }

}

const mapStateToProps = state => ({
  })
   
  const mapDispatchToProps = {
    error: errorSession
  }
   
  XmppStore.propTypes = {
    loading: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(XmppStore)
