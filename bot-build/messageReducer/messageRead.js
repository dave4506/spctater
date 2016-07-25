'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./actionSets/default/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processMessageRead = function processMessageRead(message, userState) {
  var userStateSet = userState.substr(0, userState.indexOf('_'));
  var userStateProgress = userState.substr(userState.indexOf('_') + 1);
  switch (userStateSet) {
    default:
      return (0, _index2.default)("MESSAGE_READ", "", userState);
  }
};

exports.default = processMessageRead;