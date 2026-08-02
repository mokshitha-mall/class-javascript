/*
1. Destructuring from null or undefined

If you destructure from null or undefined,
JavaScript throws a TypeError.

Safe way:
Use || {} so an empty object is used instead.
*/

const obj = null;

// const { a, b } = obj; // TypeError

const { a, b } = obj || {};

console.log("a:", a);
console.log("b:", b);



/*
2. Does map() skip holes?

Yes.
map() skips empty slots just like forEach().

find() does not skip holes.
*/

const sparseArray = [1, , 3];

console.log("map():");
sparseArray.map(value => console.log(value));

console.log("forEach():");
sparseArray.forEach(value => console.log(value));

console.log("find():");
sparseArray.find(value => {
    console.log(value);
    return false;
});



/*
3. sort() without a comparator

sort() converts values to strings and sorts them
alphabetically by default.
*/

const numbers = [10, 2, 33, 4];

console.log("Before sort:", numbers);

numbers.sort();

console.log("Default sort:", numbers);

// Numeric sort
numbers.sort((a, b) => a - b);

console.log("Numeric sort:", numbers);



/*
4. Skip elements in array destructuring

Leave a blank space between commas to skip
an element.
*/

const arr = [10, 20, 30];

const [first, , third] = arr;

console.log("First:", first);
console.log("Third:", third);



/*
5. includes() vs indexOf() with NaN

includes() finds NaN correctly.

indexOf() cannot find NaN because
NaN === NaN is false.
*/

const values = [1, NaN, 3];

console.log("includes(NaN):", values.includes(NaN));
console.log("indexOf(NaN):", values.indexOf(NaN)); 