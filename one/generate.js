import AlchemyAPI from 'alchemy-api'
import natural from 'natural'
import firebase from 'firebase'

firebase.initializeApp({
  serviceAccount: "./one/serviceAccountCredentials.json",
  databaseURL: "https://contentgen-8876e.firebaseio.com/"
});

const api_key = '22f071f9b417654ed0a57058c3d72c137493c4e7'
const back_up = '28a8e03455fb7c9124b197b372ad4d6dd8422e3f'

const wordnet = new natural.WordNet();
const nounInflector = new natural.NounInflector();
const alchemy = new AlchemyAPI(back_up);

const generations = 2;
const textDataExtract = ["doc-emotion","doc-sentiment","keyword","concept"];
const responseDataKeys = ["docSentiment","keywords","concepts","docEmotions"];

const splitter = (txt,words) => {
  if(txt.indexOf("_") == -1) {
    words.push(txt)
    return words;
  } else {
    const first = txt.substr(0,txt.indexOf("_"));
    const left = txt.substr((txt.indexOf("_"))+1,txt.length-1);
    words.push(first);
    return splitter(left,words);
  }
}

const generationLife = (txt,text_generations,fileI,file) => {
  return new Promise((res,rej)=>{
    alchemy.combined(txt,textDataExtract,{},(err,resp)=>{
      if (err) {rej(err)};
      const new_gen = {}
      if(!resp.totalTransactions)
        console.log(resp)
      console.log(`API_CALL count = ${resp.totalTransactions}`)
      responseDataKeys.map((t)=>{
        new_gen[t] = resp[t]
      })
      res(new_gen);
    })
    }).then((new_gen)=>{
    console.log()
    console.log(`//////////////////////////GENERATION:${text_generations.length}////////////////////////////`)
    console.log(txt)
    const stats = new_gen
    console.log(`Sentiment Analysis: generally ${stats.docSentiment.type}, exact number is ${stats.docSentiment.score}`)
    if(stats.docSentiment.mixed)
      console.log(`Note: The piece appears mixed in sentiment.`)
    console.log("Emotion Analysis:")
    console.log("anger:",stats.docEmotions.anger)
    console.log("fear:",stats.docEmotions.fear)
    console.log("disgust:",stats.docEmotions.disgust)
    console.log("joy:",stats.docEmotions.joy)
    console.log("sadness:",stats.docEmotions.sadness)
    console.log()
    return new_gen
  })
  .then((new_gen)=>{
    text_generations.push(Object.assign({},new_gen,{text:txt}));
    return new_gen
  }).then((new_gen)=>{
    const lookup = [].concat(new_gen.keywords).map(({text})=>{
      return new Promise((res,rej)=>{
        var s = []
        var new_text = text.replace(/ /g,'_')
        new_text = new_text.toLowerCase();
        wordnet.lookup(new_text,(results)=>{
          results.map((r)=>{
            if(r.synonyms) {
              s = s.concat(r.synonyms)
            }
          })
          const set = new Set(s);
          res({og:text.replace(/ /g,'_'),phrase:new_text,synonyms:Array.from(set)})
        })
      })
    })
    return Promise.all(lookup)
  }).then((syns)=>{
    const lookup = []
    syns.map(({phrase,synonyms,og})=>{
      if(synonyms.length == 0) {
        var split = splitter(phrase,[]);
        var ogSplit = splitter(og,[]);
        if(split.length == 0)
          split = [phrase]
        split.map((word,i)=>{
          const promise = new Promise((res,rej)=>{
            var s = []
            wordnet.lookup(word,(results)=>{
              results.map((r)=>{
                if(r.synonyms) {
                  s = s.concat(r.synonyms)
                }
              })
              const set = new Set(s);
              res({og:ogSplit[i],phrase:word,synonyms:Array.from(set)})
            })
          })
          lookup.push(promise);
        })
      }
    })
    return Promise.all([].concat(syns).concat(lookup))
  }).then((syns)=>{
    var new_txt = ''.concat(txt);
    syns.map(({phrase,synonyms,og})=>{
      if(synonyms.length != 0) {
        const syn = synonyms[Math.floor(Math.random()*synonyms.length)];
        //console.log("replacing",og,"with",syn);
        const re = new RegExp(og,"g");
        new_txt = new_txt.replace(re,syn.replace(/_/g,' '));
      } else {
      }
    })
    return new_txt
  }).then((new_txt)=>{
    if(text_generations.length != 1) {
      const last = text_generations[text_generations.length-1]
      var updates = {}
      updates['/text/'+file+'/'+fileI] = last.text
      updates['/analysis/'+file+'/'+fileI] = {emotions:last.docEmotions,sentiment:last.docSentiment}
      updates['/textMeta/'+file+'/timestamp'] = firebase.database.ServerValue.TIMESTAMP;
      return firebase.database().ref().update(updates).then(()=>{ return new_txt});
    } else {
      return new_txt
    }
  })
  .then((new_txt)=>{
    if(text_generations.length < generations)
      return generationLife(new_txt,text_generations,fileI,file);
    else
      return text_generations
  });
}

//generationLife(text_input)

const one = ()=> {
  return firebase.database().ref('textMeta').once('value').then((snapshot)=>{
    var texts = snapshot.val();
    var lookup = [].concat(Object.keys(texts)).map((t)=>{
      return new Promise((res,rej)=>{
        firebase.database().ref('text').child(t).limitToLast(1).once('value').then((snapshot)=>{
          res(Object.assign({textKey:t},snapshot.val()));
        });
      })
    })
    return Promise.all(lookup);
  }).then((texts)=>{
    var obj = {}
    var lookup = [].concat(texts).map((t)=>{
      var key = t.textKey
      var i = -1;
      Object.keys(t).map((k)=>{
        if(k != 'textKey')
          i = parseInt(k)
      })
      return new Promise((res,rej)=>{
        generationLife(t[i],[],(i+1),key).then(()=>{
          res("done")
        })
      })
    })
    return Promise.all(lookup)
  }).then((arr)=>{
    process.exit()
  })
}

one();
