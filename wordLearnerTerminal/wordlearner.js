import ps from 'prompt-sync';
import fs from 'fs';
const databaseFile = 'data.json';

////////////////////////////////
///////// CONSTANTS ////////////
////////////////////////////////

const testLength = 3;

///////////////////////////
///////// MAIN ////////////
///////////////////////////

let data = getData();
let command;
const prompt = ps();
console.log('Welcome to Word Learner!');

while (command !== -1) {
    console.log('What do you want to do?');
    console.log('   1. Add a new word.');
    console.log('   2. Test yourself.');
    console.log('   3. Get total number of words.');
    console.log('   4. Get test stats.');
    console.log('   -1. Exit program.');
    console.log();
    
    command = parseInt(prompt('Enter number: '));
    console.log();

    if (command === 1) {
        addWord();
    } else if (command === 2) {
        testYourself();
    } else if (command === 3) {
        getTotalWords();
    } else if (command === 4) {
        getTestStats();
    } else if (command === -1) {
        console.log('Exiting the program. Goodbye!');
    } else {
        console.log('Invalid input.')
    }

    console.log();

    setData(data);
}

////////////////////////////////
///////// FUNCTIONS ////////////
////////////////////////////////

function getTestStats() {

    if (data.testScores.length < 5) {
        console.log(`Total Tests Completed: ${data.testScores.length}`)
        console.log(`Avg Score: ${totalScore/data.testScores.length}`)
        return 0;
    }

    let totalScore = 0
    for (let i = 0; i < data.testScores.length; i++) {
        totalScore += data.testScores[i].score;
    }
    console.log(`Total Tests Completed: ${data.testScores.length}`)
    console.log(`Overall Average Score: ${totalScore/data.testScores.length}`)

    console.log('Last 5 Test Scores: ')
    let l5Tests = data.testScores.slice(data.testScores.length - 5);
    let l5Avg = 0;
    for (let i = 4; i >= 0; i--) {
        console.log(`    ${l5Tests[i].timestamp.slice(0,10)}: ${l5Tests[i].score}/${testLength}.`);
        l5Avg += l5Tests[i].score;
    }
    // l5Avg = l5Avg/5;
    console.log(`Last 5 Tests Average: ${l5Avg/5}/3`)

}

function getTotalWords() {
    const nouns = data.words.filter(word => word.type === 'noun');
    const verbs = data.words.filter(word => word.type === 'verb');
    const adjectives = data.words.filter(word => word.type === 'adjective');
    console.log(`Total number of words is: ${data.words.length}`);
    console.log(`    Nouns: ${nouns.length}`);
    console.log(`    Verbs: ${verbs.length}`);
    console.log(`    Adjectives: ${adjectives.length}`);

}

function testYourself() {
    let score = 0;
    for (let i = 0; i < testLength; i++) {
        let rand = generateRandom();
        let word = data.words[rand];
        
        let array = [];
        array.push(word);

        while (array.length !== 3) {
            rand = generateRandom();
            let newWord = data.words[rand];

            // Ensure no duplicate definitions
            const exists = array.find((wordObject) => wordObject.word === newword.word);
            if (typeof(exists) === 'undefined') {
                array.push(newWord);
            }
        }

        shuffle(array);

        console.log(`The word is "${word.word}". Pick the definition:`);
        let j = 1;
        for (const word of array) {
            console.log(`    ${j}. ${word.definition}`)
            j++;
        }

        let answer = parseInt(prompt('\nChoose the definition (number): '));
        
        if (word.definition === array[answer-1].definition) {
            score++;
            console.log(`Correct answer! Total score: ${score}/${testLength}\n`)
        } else {
            console.log(`Wrong answer :( Total score: ${score}/${testLength}\n`)
        }
    }

    // Record your test score in testScores
    let result = {};
    result.timestamp = new Date();
    result.score = score;
    data.testScores.push(result);

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function generateRandom() {
    let maxSize = data.words.length;
    let rand = Math.random() * maxSize;
    // console.log(rand); // say 99.81321410836433
  
    rand = Math.floor(rand); // 99
  
    return rand;
  }

function addWord() {
    let newWord = {};
    
    let word = prompt('Enter the new word: ')
    word = word.toLocaleLowerCase();

    // Check if the word already exists
    if (checkWordExists(word)) {
        console.log('\n [ERROR] Word already exists!');
        return 1;
    }

    newWord.word = word;
    
    let definition = prompt('Enter the definition: ');
    definition = definition.toLocaleLowerCase();
    newWord.definition = definition;

    let type = prompt('Enter the type (noun/verb...): ')
    type = type.toLocaleLowerCase();
    newWord.type = type;

    newWord.numCorrect = 0;
    newWord.numWrong = 0;
    newWord.timestampAdded = new Date();
    
    data.words.push(newWord);

    console.log(`\nAdded "${word}" to the database. Nice one!`)
    return 0;
}


function checkWordExists(word) {
    const exists = data.words.find((wordObject) => wordObject.word === word);
    if (typeof(exists) === 'object') {
        return 1;
    }
    return 0;
}

// Use get() to access the data
function getData() {
    const readDatabase = fs.readFileSync(databaseFile, { flag: 'r', encoding: 'ascii' });
    let tempDatabase = JSON.parse(readDatabase.toString());
    return tempDatabase;
}

// Use set(newData) to pass in the entire data object, with modifications made
function setData(newData) {
    let tempDatabase = newData;
    fs.writeFileSync(databaseFile, JSON.stringify(tempDatabase, null, 4));
}

export {getData}