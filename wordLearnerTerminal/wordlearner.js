import ps from 'prompt-sync';
import fs from 'fs';
const databaseFile = 'data.json';

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
    console.log('   -1. Exit program.');
    
    command = parseInt(prompt('Enter number: '));

    if (command === 1) {
        addWord();
    } else if (command === 2) {
        testYourself();
    } else if (command === 3) {
        getTotalWords();
    } else if (command === -1) {
        console.log('Exiting the program. Goodbye!');
    } else {
        console.log('Invalid input.')
    }

}

////////////////////////////////
///////// FUNCTIONS ////////////
////////////////////////////////

function getTotalWords() {
    console.log(`Total number of words is: ${data.words.length}`);
}

function testYourself() {
    let score = 0;
    for (let i = 0; i < 3; i++) {
        let rand = generateRandom();
        let rand1 = generateRandom();
        let rand2 = generateRandom();
        let rand3 = generateRandom();
        let rand4 = generateRandom();

        let word = data.words[rand];
        
        let array = [];
        array.push(word.definition);
        array.push(data.words[rand1].definition);
        array.push(data.words[rand2].definition);
        array.push(data.words[rand3].definition);
        array.push(data.words[rand4].definition);
        shuffle(array);

        console.log(`The word is "${word.word}". Pick the definition:`);
        let j = 1;
        for (const definition of array) {
            console.log(`    ${i}. ${definition}`)
            j++;
        }

        let answer = parseInt(prompt('\nChoose the definition (number): '));
        
        if (word.definition === array[answer-1]) {
            score++;
            console.log(`Correct answer! Total score is: ${score}`)
        } else {
            console.log(`Wrong answer :( Total score is: ${score}`)
        }

        console.log();
    }

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
    
    let word = prompt('Enter the word: ')
    word = word.toLocaleLowerCase();

    // Check if the word already exists
    if (checkWordExists(word)) {
        console.log('Word already exists.');
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
    
    data.words.push(newWord);
    setData(data);

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