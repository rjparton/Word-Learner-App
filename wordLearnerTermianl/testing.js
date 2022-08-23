const database = [
    {
        id: 1,
        name: 'robbie'
    },
    {
        id: 2,
        name: 'mani'
    }
]

const person = database.find((person) => person.id === 2);
console.log(person);
console.log(typeof(person));
const person2 = database.find((person) => person.id === 0);
console.log(person2);
console.log(typeof(person2));
console.log(typeof(person2) === 'undefined');