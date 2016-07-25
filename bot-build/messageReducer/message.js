'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./actionSets/default/index');

var _index2 = _interopRequireDefault(_index);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processMessage = function processMessage(message, userState) {
  var userStateSet = userState.substr(0, userState.indexOf('_'));
  var userStateProgress = userState.substr(userState.indexOf('_') + 1);
  return _firebase2.default.database().ref('chat/' + "test_key").push({ from: "spctater", message: message.text }).then(function () {
    return { userState: userState };
  });
};

exports.default = processMessage;