'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _collection = require('lodash/collection');

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _index = require('../messageReducer/index');

var _index2 = _interopRequireDefault(_index);

var _messageHelper = require('./messageHelper');

var _messageHelper2 = _interopRequireDefault(_messageHelper);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebase2.default.initializeApp({
  databaseURL: "https://contentgen-8876e.firebaseio.com/",
  serviceAccount: "./keys.json"
});

var senderId = "1048109078558272";

_firebase2.default.database().ref('chat/' + "test_key").on('child_added', function (snapshot) {
  var data = snapshot.val();
  if (data.from == "client" && senderId != "") {
    console.log("here?");
    sendMessage(senderId, { text: data.message });
  }
});

var token = "EAAQGcC4fkSQBAP2hnZC8JZA2HyHQVHTLhoLsl6sPmULbWnGGDKa4Vdkx4ew9QIziRpba97ajDtOKCyY6UxBkdT85MjLtoMQuTCZAYqqWX1Gh9uwRsAkvbUvRqZCJxHYuF6IDv1SZBXLqmBdNRTFYFrJ7yZC45434GTGZBrJHZAMPzgZDZD";

var sendMessage = function sendMessage(id, messageData) {
  (0, _request2.default)({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: token },
    method: 'POST',
    json: {
      recipient: { id: id },
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};

var router = _express2.default.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Recieved facebook webhook response: ', Date.now());
  next();
});

// for Facebook verification
router.get('/', function (req, res) {
  if (req.query['hub.verify_token'] === 'yoyo') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
});

router.post('/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;
  var messageGroups = (0, _collection.groupBy)(messaging_events, function (m) {
    return m.sender.id;
  });
  Object.keys(messageGroups).map(function (k) {
    var messages = messageGroups[k];
    var userState = "TEST_INTERFACE";
    var lastMessage = messages[messages.length - 1];
    console.log(k, messages);
    Promise.resolve((0, _messageHelper2.default)(lastMessage)).then(function (msg_type) {
      switch (msg_type) {
        case "QUICK_REPLY":
          return _index2.default.processPostBackQuickReply(lastMessage.message, userState);
        case "POSTBACK":
          return _index2.default.processPostBack(lastMessage.postback, userState);
        case "TEXT_MESSAGE":
          if (k == senderId) return _index2.default.processMessage(lastMessage.message, userState);
        case "ATTACHMENT_MESSAGE":
          return _index2.default.processAtchMessage(lastMessage.message, userState);
      }
    }).then(function (_ref) {
      var userState = _ref.userState;
      var message = _ref.message;
      var state = userState.state;
      var payload = userState.payload;

      return { message: message };
      //return db.updateUserState(k,state,payload).then(()=>{return {message}})
    }).then(function (_ref2) {
      var message = _ref2.message;

      if (message) return sendMessage(k, message.messageify());else return { status: "NO_MESSAGE_SENT" };
    }).then(function (s) {
      console.log("Message sent successful.");
    }).catch(function (error) {
      console.log("ERROR: " + error);
    });
  });
  res.sendStatus(200);
});

module.exports = router;