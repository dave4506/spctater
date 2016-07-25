"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuickReply = function () {
  function QuickReply(title, payload) {
    _classCallCheck(this, QuickReply);

    this.title = title;
    this.payload = JSON.stringify(payload);
  }

  _createClass(QuickReply, [{
    key: "messageify",
    value: function messageify() {
      return {
        "content_type": "text",
        title: this.title,
        payload: this.payload
      };
    }
  }]);

  return QuickReply;
}();

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);

    if (this.messageify === undefined) {
      throw new TypeError("Must override method");
    }
    this.quickReplies = [];
  }

  _createClass(Message, [{
    key: "messageify",
    value: function messageify() {
      var primedQr = [];
      this.quickReplies.map(function (q) {
        primedQr.push(q.messageify());
      });
      if (this.quickReplies.length < 1) return {};else return {
        quick_replies: primedQr
      };
    }
  }, {
    key: "addQuickReply",
    value: function addQuickReply(qr) {
      this.quickReplies.push(qr);
    }
  }, {
    key: "addQuickReplies",
    value: function addQuickReplies(qrs) {
      this.quickReplies.concat(qrs);
    }
  }]);

  return Message;
}();

var TextMessage = function (_Message) {
  _inherits(TextMessage, _Message);

  function TextMessage(text) {
    _classCallCheck(this, TextMessage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextMessage).call(this));

    _this.text = text;
    return _this;
  }

  _createClass(TextMessage, [{
    key: "messageify",
    value: function messageify() {
      return Object.assign({}, _get(Object.getPrototypeOf(TextMessage.prototype), "messageify", this).call(this), { text: this.text });
    }
  }, {
    key: "changeText",
    value: function changeText(text) {
      return new TextMessage(text);
    }
  }]);

  return TextMessage;
}(Message);

var MediaMessage = function (_Message2) {
  _inherits(MediaMessage, _Message2);

  function MediaMessage(type, url) {
    _classCallCheck(this, MediaMessage);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MediaMessage).call(this));

    _this2.type = type;
    _this2.url = url;
    return _this2;
  }

  _createClass(MediaMessage, [{
    key: "messageify",
    value: function messageify() {
      return Object.assign({}, _get(Object.getPrototypeOf(MediaMessage.prototype), "messageify", this).call(this), {
        attachment: {
          "type": this.type,
          payload: {
            url: this.url
          }
        }
      });
    }
  }]);

  return MediaMessage;
}(Message);

var ImageMessage = function (_MediaMessage) {
  _inherits(ImageMessage, _MediaMessage);

  function ImageMessage(url) {
    _classCallCheck(this, ImageMessage);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ImageMessage).call(this, "image", url));
  }

  _createClass(ImageMessage, [{
    key: "changeUrl",
    value: function changeUrl(url) {
      return new ImageMessage(url);
    }
  }]);

  return ImageMessage;
}(MediaMessage);

var AudioMessage = function (_MediaMessage2) {
  _inherits(AudioMessage, _MediaMessage2);

  function AudioMessage(url) {
    _classCallCheck(this, AudioMessage);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AudioMessage).call(this, "audio", url));
  }

  _createClass(AudioMessage, [{
    key: "changeUrl",
    value: function changeUrl(url) {
      return new AudioMessage(url);
    }
  }]);

  return AudioMessage;
}(MediaMessage);

var VideoMessage = function (_MediaMessage3) {
  _inherits(VideoMessage, _MediaMessage3);

  function VideoMessage(url) {
    _classCallCheck(this, VideoMessage);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VideoMessage).call(this, "video", url));
  }

  _createClass(VideoMessage, [{
    key: "changeUrl",
    value: function changeUrl(url) {
      return new VideoMessage(url);
    }
  }]);

  return VideoMessage;
}(MediaMessage);

var FileMessage = function (_MediaMessage4) {
  _inherits(FileMessage, _MediaMessage4);

  function FileMessage(url) {
    _classCallCheck(this, FileMessage);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FileMessage).call(this, "file", url));
  }

  _createClass(FileMessage, [{
    key: "changeUrl",
    value: function changeUrl(url) {
      return new FileMessage(url);
    }
  }]);

  return FileMessage;
}(MediaMessage);

var ButtonMessage = function (_Message3) {
  _inherits(ButtonMessage, _Message3);

  function ButtonMessage(text, buttons) {
    _classCallCheck(this, ButtonMessage);

    var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonMessage).call(this));

    _this7.text = text;
    _this7.buttons = buttons || [];
    return _this7;
  }

  _createClass(ButtonMessage, [{
    key: "addButton",
    value: function addButton(button) {
      return new ButtonMessage(this.text, this.buttons.push(button));
    }
  }, {
    key: "addButtons",
    value: function addButtons(buttons) {
      return new ButtonMessage(this.text, this.buttons.concat(buttons));
    }
  }, {
    key: "changeText",
    value: function changeText(text) {
      return new ButtonMessage(text, this.buttons);
    }
  }, {
    key: "messageify",
    value: function messageify() {
      var primedButtons = [];
      this.buttons.map(function (b) {
        primedButtons.push(b.messageify());
      });
      return Object.assign({}, _get(Object.getPrototypeOf(ButtonMessage.prototype), "messageify", this).call(this), {
        attachment: {
          "type": "template",
          "payload": {
            "template_type": "button",
            text: this.text,
            "buttons": primedButtons
          }
        }
      });
    }
  }]);

  return ButtonMessage;
}(Message);

var GenericMessage = function (_Message4) {
  _inherits(GenericMessage, _Message4);

  function GenericMessage(elements) {
    _classCallCheck(this, GenericMessage);

    var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(GenericMessage).call(this));

    _this8.elements = elements;
    return _this8;
  }

  _createClass(GenericMessage, [{
    key: "messageify",
    value: function messageify() {
      var primedElements = [];
      this.elements.map(function (e) {
        primedElements.push(e.messageify());
      });
      return Object.assign({}, _get(Object.getPrototypeOf(GenericMessage.prototype), "messageify", this).call(this), {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": primedElements
          }
        }
      });
    }
  }, {
    key: "addElement",
    value: function addElement(element) {
      return new GenericMessage(this.elements.push(element));
    }
  }, {
    key: "addElements",
    value: function addElements(elements) {
      return new GenericMessage(this.elements.concat(elements));
    }
  }]);

  return GenericMessage;
}(Message);

var Element = function () {
  function Element(title, image_url, subtitle, buttons) {
    _classCallCheck(this, Element);

    this.title = title, this.image_url = image_url, this.subtitle = subtitle, this.buttons = buttons;
  }

  _createClass(Element, [{
    key: "addButton",
    value: function addButton(button) {
      return new Element(this.title, this.image_url, this.subtitle, this.buttons.push(button));
    }
  }, {
    key: "addButtons",
    value: function addButtons(buttons) {
      return new Element(this.title, this.image_url, this.subtitle, this.buttons.concat(buttons));
    }
  }, {
    key: "messageify",
    value: function messageify() {
      var title = this.title;
      var imageUrl = this.imageUrl;
      var subtitle = this.subtitle;
      var buttons = this.buttons;

      return { title: title, imageUrl: imageUrl, subtitle: subtitle, buttons: buttons };
    }
  }]);

  return Element;
}();

var Button = function () {
  function Button(type, title) {
    _classCallCheck(this, Button);

    this.type = type, this.title = title;
  }

  _createClass(Button, [{
    key: "messageify",
    value: function messageify() {
      return {
        "type": this.type,
        title: this.title
      };
    }
  }]);

  return Button;
}();

var PostBackButton = function (_Button) {
  _inherits(PostBackButton, _Button);

  function PostBackButton(title, payload) {
    _classCallCheck(this, PostBackButton);

    var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(PostBackButton).call(this, "postback", title));

    _this9.payload = JSON.stringify(payload);
    return _this9;
  }

  _createClass(PostBackButton, [{
    key: "messageify",
    value: function messageify() {
      var button = _get(Object.getPrototypeOf(PostBackButton.prototype), "messageify", this).call(this);
      button.payload = this.payload;
      return button;
    }
  }]);

  return PostBackButton;
}(Button);

var WebUrlButton = function (_Button2) {
  _inherits(WebUrlButton, _Button2);

  function WebUrlButton(title, url) {
    _classCallCheck(this, WebUrlButton);

    var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(WebUrlButton).call(this, "web_url", title));

    _this10.url = url;
    return _this10;
  }

  _createClass(WebUrlButton, [{
    key: "messageify",
    value: function messageify() {
      var button = _get(Object.getPrototypeOf(WebUrlButton.prototype), "messageify", this).call(this);
      button.url = this.url;
      return button;
    }
  }]);

  return WebUrlButton;
}(Button);

exports.default = {
  TextMessage: TextMessage,
  ImageMessage: ImageMessage,
  FileMessage: FileMessage,
  AudioMessage: AudioMessage,
  VideoMessage: VideoMessage,
  ButtonMessage: ButtonMessage,
  GenericMessage: GenericMessage,
  Element: Element,
  PostBackButton: PostBackButton,
  WebUrlButton: WebUrlButton,
  QuickReply: QuickReply
};