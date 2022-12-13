// THIS WORKS!!

// const http = require("https");
import http from 'https';

const app_id = "69a3a6e5";
const app_key = "0098d766e262e8cd0b75cdf9e96b7b65";
const wordId = "mother";
const fields = "definitions";
const strictMatch = "false";

const options = {
  host: 'od-api.oxforddictionaries.com',
  port: '443',
  path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
  method: "GET",
  headers: {
    'app_id': app_id,
    'app_key': app_key
  }
};

http.get(options, (resp) => {
    let body = '';
    resp.on('data', (d) => {
        body += d;
    });
    // console.log(body);
    resp.on('end', () => {
      let parsed = JSON.parse(body);
      // console.log(parsed);
      // print(parsed);
      store(parsed);
      // console.log(parsed.results);

      
    });
});

// function print(data) {
//   console.log(data);
// }

let word;
let definition;
function store(data) {
  definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
  word = data.id;
  
  console.log(word);
  console.log(definition);
  
} 