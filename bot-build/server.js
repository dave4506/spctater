'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _facebookWebhook = require('./webhook/facebookWebhook');

var _facebookWebhook2 = _interopRequireDefault(_facebookWebhook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 5000);

// Process application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Process application/json
app.use(_bodyParser2.default.json());

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot');
});

// Facebook webhook router
app.use('/webhook', _facebookWebhook2.default);

// Spin up the server
app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'));
});