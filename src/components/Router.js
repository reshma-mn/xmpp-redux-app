import React from 'react';
import {StackNavigator } from 'react-navigation';
import ChatFriends from './ChatFriends';
import Conversation from './Conversation';
export const Router = StackNavigator({
  FriendsList: {
    screen: ChatFriends,
    navigationOptions: {
      title: 'Friends',
    },
  },
  Conversation: {
    screen: Conversation,
   
    
  }
},
  {
    initialRouteName: 'FriendsList',
  }
);