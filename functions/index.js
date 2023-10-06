const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const wordMap = {
  'abn': 'ABN AMRO',
  'ing': 'ING Bank',
  'rabo': 'Rabobank',
  'triodos': 'Triodos Bank',
  'volksbank': 'de Volskbank',
};

app.put('/', (req, res) => {
  const sentence = req.body.toString();

  if (!sentence) {
    return res.status(400).json({error: 'Missing sentence in the request'});
  }

  // Check using regex through each word in the sentence
  // to find a match to wordMap dictionary words
  const finalSentence = sentence.replace(/\b\w+\b/g, (word) => {
    return wordMap[word.toLowerCase()] || word;
  });

  res.json({result: finalSentence});
});

exports.app = functions.https.onRequest(app);
