function getNumbers(){
    return[1,2,3,4,5];
}

const Numbers = getNumbers();
console.log(Numbers);
//Generator
function* numbers(){
    yield 1;
    yield 2;
    yield 3;
}

//Generator returns an Iterator
const iterator = numbers();
console.log(iterator.next());   //{ value: 1, done: false }
console.log(iterator.next());   //{ value: 2, done: false }
console.log(iterator.next());   //{ value: 3, done: false }
console.log(iterator.next());   //{ value: undefined, done: true }
