
const array = [
    {
        word: 'hello'
    },
    {
        word: 'yo'
    }
]

let word = 'no';

const exists = array.find((wordObject) => wordObject.word === word);

console.log(typeof(exists) === 'undefined');