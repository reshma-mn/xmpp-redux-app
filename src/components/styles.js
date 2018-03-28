import React from 'react';
import  {StyleSheet, PixelRatio, Platform} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 70,
        backgroundColor: '#F7F7F7',
        
    },
    row: {
        flexDirection: 'row',
        backgroundColor:'white',
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: '#d6d7da',
        padding:10,
        alignItems: 'center'
    },
    rowList: {
        width:'100%',
        paddingHorizontal: 20,
    },
    friendList: {
        width:'100%',
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginVertical: 3,
        marginHorizontal: 3,
        borderColor: 'black',
        borderWidth: 2,
    },
    roundFixedButton: {
        // backgroundColor:'red',
        borderColor: '#000000',
        borderWidth: 2,
        width:"80%",
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        bottom:10,
    },
    friendModalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        borderColor: '#000000',
        borderWidth: 2,
        backgroundColor:'black',

    },
    friendModalWrapper: {
        width: "70%",
        margin: '20%',
        backgroundColor:'white',

    },
    modalInput: {
        padding: 10,

    },
    modalSaveButton: {
        marginHorizontal: 5,
        borderColor: 'green',
        borderWidth: 2,
        flex:1,
        alignItems: 'center',
    },
    modalCancelButton: {
        marginHorizontal: 5,
        borderColor: 'red',
        borderWidth: 2,
        flex:1,
        alignItems: 'center',
    },
    modalButtons: {
        paddingVertical:5,
        flexDirection: 'row',
    },
    buttonText: {
        paddingVertical: 5,
    },
    categoryLabel: {
        fontSize: 15,
        textAlign: 'left',
        left: 10,
        padding:10,
        fontWeight:'bold',
    },
    lastRow: {
        flexDirection: 'row',
        backgroundColor:'white',
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#d6d7da',
        padding:10,
        alignItems: 'center'
    },
    rowLabel: {
        left:10,
        flex:1,
        fontSize:15,
    },
    rowInput: {
        fontSize:15,
        flex:1,
        height:(Platform.OS=='ios') ? 30 : 50
    },
    messageItem: {
        padding:10,
        paddingRight:20,
        fontSize:15
    },
    messageBar: {
        backgroundColor:'white',
        flexDirection:'row',
        left:0,
        right:0,
        height:55
    },
    message: {
        left:10,
        right:10,
        fontSize:15,
        flex:1,
        height:30
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderColor: '#eeeeee',
        borderWidth:1,
        borderBottomWidth: 1 / PixelRatio.get(),
        marginTop:20,
        borderRadius:10,
        width:300,
        marginRight:20,
        marginLeft:20,
        alignSelf: 'center'
    },
    sendButton: {
        justifyContent: 'center',
        width:80
    },
    navBar: {
        backgroundColor: '#0db0d9'
    },
    loadingContainer: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'black',
        opacity:0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width:70,
        borderRadius: 6,
        height:70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },
    text: {
        color: "red"
    }

});
export default styles;