"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _messageCreator = require("../messageCreator");

var _messageCreator2 = _interopRequireDefault(_messageCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextMessage = _messageCreator2.default.TextMessage;


var defaultAction = function defaultAction(msgType, msg, userState) {
  return {
    userState: userState,
    message: new TextMessage("Sorry! TouchID was too fast! Didn't catch your notification.")
  };
};

exports.default = defaultAction;