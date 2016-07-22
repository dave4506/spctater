'use strict';

var _alchemyApi = require('alchemy-api');

var _alchemyApi2 = _interopRequireDefault(_alchemyApi);

var _natural = require('natural');

var _natural2 = _interopRequireDefault(_natural);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebase2.default.initializeApp({
  serviceAccount: "./one/serviceAccountCredentials.json",
  databaseURL: "https://contentgen-8876e.firebaseio.com/"
});

var api_key = '22f071f9b417654ed0a57058c3d72c137493c4e7';
var back_up = '28a8e03455fb7c9124b197b372ad4d6dd8422e3f';

var wordnet = new _natural2.default.WordNet();
var nounInflector = new _natural2.default.NounInflector();
var alchemy = new _alchemyApi2.default(back_up);

var generations = 1;
var textDataExtract = ["doc-emotion", "doc-sentiment", "keyword", "concept"];
var responseDataKeys = ["docSentiment", "keywords", "concepts", "docEmotions"];

var splitter = function splitter(txt, words) {
  if (txt.indexOf("_") == -1) {
    words.push(txt);
    return words;
  } else {
    var first = txt.substr(0, txt.indexOf("_"));
    var left = txt.substr(txt.indexOf("_") + 1, txt.length - 1);
    words.push(first);
    return splitter(left, words);
  }
};

var generationLife = function generationLife(txt, text_generations, fileI, file) {
  return new Promise(function (res, rej) {
    alchemy.combined(txt, textDataExtract, {}, function (err, resp) {
      if (err) {
        rej(err);
      };
      var new_gen = {};
      if (!resp.totalTransactions) console.log(resp);
      console.log('API_CALL count = ' + resp.totalTransactions);
      responseDataKeys.map(function (t) {
        new_gen[t] = resp[t];
      });
      res(new_gen);
    });
  }).then(function (new_gen) {
    console.log();
    console.log('//////////////////////////GENERATION:' + text_generations.length + '////////////////////////////');
    console.log(txt);
    var stats = new_gen;
    console.log('Sentiment Analysis: generally ' + stats.docSentiment.type + ', exact number is ' + stats.docSentiment.score);
    if (stats.docSentiment.mixed) console.log('Note: The piece appears mixed in sentiment.');
    console.log("Emotion Analysis:");
    console.log("anger:", stats.docEmotions.anger);
    console.log("fear:", stats.docEmotions.fear);
    console.log("disgust:", stats.docEmotions.disgust);
    console.log("joy:", stats.docEmotions.joy);
    console.log("sadness:", stats.docEmotions.sadness);
    console.log();
    return new_gen;
  }).then(function (new_gen) {
    text_generations.push(Object.assign({}, new_gen, { text: txt }));
    return new_gen;
  }).then(function (new_gen) {
    var lookup = [].concat(new_gen.keywords).map(function (_ref) {
      var text = _ref.text;

      return new Promise(function (res, rej) {
        var s = [];
        var new_text = text.replace(/ /g, '_');
        new_text = new_text.toLowerCase();
        wordnet.lookup(new_text, function (results) {
          results.map(function (r) {
            if (r.synonyms) {
              s = s.concat(r.synonyms);
            }
          });
          var set = new Set(s);
          res({ og: text.replace(/ /g, '_'), phrase: new_text, synonyms: Array.from(set) });
        });
      });
    });
    return Promise.all(lookup);
  }).then(function (syns) {
    var lookup = [];
    syns.map(function (_ref2) {
      var phrase = _ref2.phrase;
      var synonyms = _ref2.synonyms;
      var og = _ref2.og;

      if (synonyms.length == 0) {
        var split = splitter(phrase, []);
        var ogSplit = splitter(og, []);
        if (split.length == 0) split = [phrase];
        split.map(function (word, i) {
          var promise = new Promise(function (res, rej) {
            var s = [];
            wordnet.lookup(word, function (results) {
              results.map(function (r) {
                if (r.synonyms) {
                  s = s.concat(r.synonyms);
                }
              });
              var set = new Set(s);
              res({ og: ogSplit[i], phrase: word, synonyms: Array.from(set) });
            });
          });
          lookup.push(promise);
        });
      }
    });
    return Promise.all([].concat(syns).concat(lookup));
  }).then(function (syns) {
    var new_txt = ''.concat(txt);
    syns.map(function (_ref3) {
      var phrase = _ref3.phrase;
      var synonyms = _ref3.synonyms;
      var og = _ref3.og;

      if (synonyms.length != 0) {
        var syn = synonyms[Math.floor(Math.random() * synonyms.length)];
        //console.log("replacing",og,"with",syn);
        var re = new RegExp(og, "g");
        new_txt = new_txt.replace(re, syn.replace(/_/g, ' '));
      } else {}
    });
    return new_txt;
  }).then(function (new_txt) {
    var last = text_generations[text_generations.length - 1];
    var updates = {};
    updates['/text/' + file + '/' + fileI] = last.text;
    updates['/analysis/' + file + '/' + fileI] = { emotions: last.docEmotions, sentiment: last.docSentiment };
    updates['/textMeta/' + file + '/timestamp'] = _firebase2.default.database.ServerValue.TIMESTAMP;
    return _firebase2.default.database().ref().update(updates).then(function () {
      return new_txt;
    });
  }).then(function (new_txt) {
    if (text_generations.length < generations) return generationLife(new_txt, text_generations, fileI, file);else return text_generations;
  });
};

//generationLife(text_input)

var one = function one() {
  return _firebase2.default.database().ref('textMeta').once('value').then(function (snapshot) {
    var texts = snapshot.val();
    var lookup = [].concat(Object.keys(texts)).map(function (t) {
      return new Promise(function (res, rej) {
        _firebase2.default.database().ref('text').child(t).limitToLast(1).once('value').then(function (snapshot) {
          res(Object.assign({ textKey: t }, snapshot.val()));
        });
      });
    });
    return Promise.all(lookup);
  }).then(function (texts) {
    var obj = {};
    var lookup = [].concat(texts).map(function (t) {
      var key = t.textKey;
      var i = -1;
      Object.keys(t).map(function (k) {
        if (k != 'textKey') i = parseInt(k);
      });
      return new Promise(function (res, rej) {
        generationLife(t[i], [], i + 1, key).then(function () {
          res("done");
        });
      });
    });
    return Promise.all(lookup);
  }).then(function (arr) {
    process.exit();
  });
};

one();
