"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_firebase2.default.initializeApp({
  databaseURL: "https://storyful-2643a.firebaseio.com/",
  serviceAccount: "./serviceAccountCredentials.json"
});

var FirebaseAdapter = function () {
  function FirebaseAdapter() {
    _classCallCheck(this, FirebaseAdapter);

    // NOTE: must you the index of the object be the root of the file path
    this.ref = _firebase2.default.database().ref("userState");
    this.storyRef = _firebase2.default.database().ref("story");
  }

  _createClass(FirebaseAdapter, [{
    key: "getUserState",
    value: function getUserState(uid) {
      var userRef = this.ref.child(uid);
      return userRef.once("value").then(function (data) {
        return data.val();
      });
    }
  }, {
    key: "updateUserState",
    value: function updateUserState(uid, newState, payload) {
      var userRef = this.ref.child(uid);
      return userRef.update({
        state: newState,
        payload: payload
      }).then(function () {
        return { newState: newState, payload: payload, uid: uid, status: "updated" };
      });
    }
  }, {
    key: "generateStoryKey",
    value: function generateStoryKey() {
      return this.storyRef.push().key;
    }
  }, {
    key: "createStory",
    value: function createStory(uid, storyKey) {
      var updates = {};
      updates['/userState/' + uid + "/state"] = "CREATE_STORY";
      updates['/userState/' + uid + "/payload"] = { key: storyKey };
      updates['/userStories/' + uid + "/" + storyKey] = true;
      updates['/story/' + storyKey] = { author: uid, article: [], title: "", imageUrl: "" };
      return _firebase2.default.database().ref().update(updates).then(function () {
        return { status: "success" };
      });
    }
  }, {
    key: "getStory",
    value: function getStory(key) {
      return this.storyRef.child(key).once("value").then(function (data) {
        return data.val();
      });
    }
  }]);

  return FirebaseAdapter;
}();

exports.default = new FirebaseAdapter();