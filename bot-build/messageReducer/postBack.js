"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./actionSets/default/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postBack = function postBack(_ref, userState) {
  var payload = _ref.payload;

  var action = JSON.parse(payload);
  switch (action.set) {
    default:
      return (0, _index2.default)("POSTBACK", "DEFAULT", userState);
  }
};

exports.default = postBack;