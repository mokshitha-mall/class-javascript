const platformArrivals = [
    "Chennai Exp",
    "Nellore Local",
    "Bangalore SF",
    "Vijayawada Pass"
];
/* 1.
Arrays are reference types in JavaScript.
When platformArrivals is passed to the function, the parameter
'trains' refers to the same array.

The sort() method modifies the original array instead of creating
a new one. Therefore, sorting 'trains' also sorts
'platformArrivals'.
*/

//2
function getSortedBoard(trains) {
    return [...trains].sort();
}
const sortedBoard = getSortedBoard(platformArrivals);
console.log("Sorted board:", sortedBoard);
console.log("Original array:", platformArrivals);
// Reverse experiment on a fresh copy
const copiedArrivals = [...platformArrivals];
const reversedBoard = copiedArrivals.reverse();
console.log("Reversed board:", reversedBoard);
console.log("Copied array after reverse:", copiedArrivals);
console.log("Original array after reverse:", platformArrivals);
/*
Array methods that mutate the original array:
- sort()
- reverse()
- splice()

Array methods that return a new array (do not mutate the original):
- slice()
- concat()
- map()
*/

// Get the last two arrivals without changing the original array
const lastTwoArrivals = platformArrivals.slice(-2);

console.log("Last two arrivals:", lastTwoArrivals);
console.log("Original array after slice:", platformArrivals);