'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = userReducer;

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userReducer(msgType, msg, userState) {
    return (0, _default2.default)(msgType, msg, userState);
}