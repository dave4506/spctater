'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _postBack = require('./postBack');

var _postBack2 = _interopRequireDefault(_postBack);

var _postBackQuickReply = require('./postBackQuickReply');

var _postBackQuickReply2 = _interopRequireDefault(_postBackQuickReply);

var _attachmentMessage = require('./attachmentMessage');

var _attachmentMessage2 = _interopRequireDefault(_attachmentMessage);

var _textPostback = require('./textPostback');

var _textPostback2 = _interopRequireDefault(_textPostback);

var _messageRead = require('./messageRead');

var _messageRead2 = _interopRequireDefault(_messageRead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  processPostBack: _postBack2.default,
  processPostBackQuickReply: _postBack2.default,
  processMessage: _message2.default,
  processAtchMessage: _attachmentMessage2.default,
  processTextPostback: _textPostback2.default,
  processMessageRead: _messageRead2.default
};