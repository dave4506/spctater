import express from 'express';
import {groupBy} from 'lodash/collection'
import firebase from 'firebase';

import MsgReducer from '../messageReducer/index'
import determineMessage from './messageHelper'
import request from 'request'

firebase.initializeApp({
  databaseURL:"https://contentgen-8876e.firebaseio.com/",
  serviceAccount:"./keys.json"
})

var senderId = "1048109078558272"

firebase.database().ref('chat/' + "test_key").on('child_added', (snapshot) => {
  const data = snapshot.val()
  if(data.from == "client" && senderId != ""){
    console.log("here?")
    sendMessage(senderId,{text:data.message})
  }
});

const token = "EAAQGcC4fkSQBAP2hnZC8JZA2HyHQVHTLhoLsl6sPmULbWnGGDKa4Vdkx4ew9QIziRpba97ajDtOKCyY6UxBkdT85MjLtoMQuTCZAYqqWX1Gh9uwRsAkvbUvRqZCJxHYuF6IDv1SZBXLqmBdNRTFYFrJ7yZC45434GTGZBrJHZAMPzgZDZD"

const sendMessage = (id,messageData)=>{
  request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:id},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Recieved facebook webhook response: ', Date.now());
  next();
});

// for Facebook verification
router.get('/',(req, res)=>{
    if (req.query['hub.verify_token'] === 'yoyo') {
        res.send(req.query['hub.challenge'])
    } else {
      res.send('Error, wrong token')
    }
})

router.post('/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    const messageGroups = groupBy(messaging_events,(m)=>{return m.sender.id})
    Object.keys(messageGroups).map((k)=>{
      var messages = messageGroups[k]
      const userState = "TEST_INTERFACE"
      const lastMessage = messages[messages.length-1];
      console.log(k,messages);
      Promise.resolve(determineMessage(lastMessage)).then((msg_type)=>{
        switch(msg_type) {
          case "QUICK_REPLY":
            return MsgReducer.processPostBackQuickReply(lastMessage.message,userState)
          case "POSTBACK":
            return MsgReducer.processPostBack(lastMessage.postback,userState)
          case "TEXT_MESSAGE":
            if(k == senderId)
              return MsgReducer.processMessage(lastMessage.message,userState)
          case "ATTACHMENT_MESSAGE":
            return MsgReducer.processAtchMessage(lastMessage.message,userState)
        }
      }).then(({userState,message})=>{
        const {state,payload} = userState;
        return {message}
        //return db.updateUserState(k,state,payload).then(()=>{return {message}})
      }).then(({message})=>{
        if (message)
          return sendMessage(k,message.messageify())
        else
          return {status:"NO_MESSAGE_SENT"}
      }).then((s)=>{
        console.log("Message sent successful.");
      }).catch((error)=>{
        console.log("ERROR: " + error);
      })
    })
    res.sendStatus(200)
})


module.exports = router;
