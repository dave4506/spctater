import express from 'express';
import fs from 'fs'
import AlchemyAPI from 'alchemy-api'
import natural from 'natural'

import constitution from './constitution'
import communist from './communist'

const wordnet = new natural.WordNet();


const api_key = '28a8e03455fb7c9124b197b372ad4d6dd8422e3f'
const generations = 5;
const replace_type = 'SYNOYMNS';
const textDataExtract = ["doc-emotion","doc-sentiment","keyword","concept"];
const responseDataKeys = ["docSentiment","keywords","concepts","docEmotions"];

const alchemy = new AlchemyAPI(api_key);

const text_input = constitution

var app = express();

const generationLife = (txt,text_generations) => {
  return new Promise((res,rej)=>{
    alchemy.combined(txt,textDataExtract,{},(err,resp)=>{
      if (err) {rej(err)};
      const new_gen = {}
      //console.log(`API_CALL count = ${resp.totalTransactions}`)
      responseDataKeys.map((t)=>{
        new_gen[t] = resp[t]
      })
      res(new_gen);
    })
  }).then((new_gen)=>{
    //console.log(new_gen);
    text_generations.push(Object.assign({},new_gen,{text:txt}));
    return new_gen
  }).then((new_gen)=>{
    const lookup = [].concat(new_gen.keywords).map(({text})=>{
      return new Promise((res,rej)=>{
        var s = []
        wordnet.lookup(text,(results)=>{
          results.map((r)=>{
            if(r.synonyms) {
              s = s.concat(r.synonyms)
            }
          })
          res({phrase:text,synonyms:s})
        })
      })
    })
    return Promise.all(lookup)
  }).then((syns)=>{
    var new_txt = ''.concat(txt);
    syns.map(({phrase,synonyms})=>{
      if(synonyms.length != 0) {
        const syn = synonyms[Math.floor(Math.random()*synonyms.length)];
        //console.log("replacing",phrase,"with",syn);
        const re = new RegExp(phrase,"g");
        new_txt = new_txt.replace(re,syn.replace(/_/g,' '));
      }
    })
    return new_txt
  })
  /*
  .then((new_txt)=>{
    if(text_generations.length < generations)
      return generationLife(new_txt,text_generations);
    else
      return text_generations;
  });*/
}
/*
app.get('/', (req, res) => {
  var text_generations = []
  generationLife(text_input,text_generations).then(()=>{
    var str = "";
    text_generations.map(({docEmotions,docSentiment,text},i)=>{
      str += `\n//////////////////////////GENERATION:${i+1}////////////////////////////\n`
      str += `${text}\n`
      str += `Sentiment Analysis: generally ${docSentiment.type}, exact number is ${docSentiment.score}\n`
      if (docSentiment.mixed)
        str += `Note: The piece appears mixed in sentiment.\n`
      str += "Emotion Analysis:\n"
      str += `anger:${docEmotions.anger}`
      str += `fear:${docEmotions.fear}`
      str += `disgust:${docEmotions.disgust}`
      str += `joy:${docEmotions.joy}`
      str += `sadness:${docEmotions.sadness}`
    })
    res.send(str);
  })
});
*/

app.use(express.static('public'));

app.get('/', (req,res) => {
  res.sendfile('./index.html')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`);
});
