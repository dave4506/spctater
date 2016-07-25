'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./actionSets/default/index');

var _index2 = _interopRequireDefault(_index);

var _postBack = require('./postBack');

var _postBack2 = _interopRequireDefault(_postBack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processQRMessage = function processQRMessage(message, userState) {
  if (message.quick_reply.payload.indexOf("UNPOSTBACK") == -1) return (0, _postBack2.default)({ payload: message.quick_reply.payload }, userState);else return (0, _index2.default)(userState, "POSTBACK");
};

exports.default = processQRMessage;