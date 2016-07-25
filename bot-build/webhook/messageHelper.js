"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = determineMessage;
function determineMessage(post) {
  if (post.message) {
    if (post.message.quick_reply) {
      return "QUICK_REPLY";
    } else if (post.message.attachments) {
      return "ATTACHMENT_MESSAGE";
    } else {
      return "TEXT_MESSAGE";
    }
  }
  if (post.postback) {
    return "POSTBACK";
  }
  if (post.read) {
    return "MESSAGE_READ";
  }
  return "UNSUPPORTED";
}