import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem } from 'react-native-elements';

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props)
       this.state = {
           userId : firebase.auth().currentUser.email,
           allnotification : []
       }
       this.notificationref = null
    }
    getNotifications = ()=>{
     this.requestref = db.collection("all_notification")
     .where("notification_status", "==", "unread")
     .where("targeted_users_Id", "==", this.state.userId)
     .onSnapshot(snapshot=>{
         var allnotification = []
         snapshot.doc.map(doc=>{
             var notification = doc.data()
             notification["doc_id"]=doc.id
             allnotification.push(notification)
         })
         this.setState({
             allnotification : allnotification
         })
     })
    }

componentDidMount(){
    this.getNotificationsnow()
}
componentWillUnmount(){
    this.notificationref()
}
keyExtractor = (item , index)=>index.toString()
renderitem = ({item, index})=>{
        return(
            <ListItem

            />
        )
}

    render(){
        return(
            <View>
                <Text>NotificationScreen</Text>
            </View>
        )
    }
}