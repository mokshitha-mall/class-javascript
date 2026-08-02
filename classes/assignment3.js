//==================================Task 1 — Destructuring Under Fire
// const config = {
//      host: "localhost",  
//      port: 8080,  
//      db: { name: "orders", replica: null }
// };
// const {
//     host,  port: PORT,  
//     db: { name: dbName, replica = "primary" },  
//     timeout = 5000,
//     region = "ap-south-1"  //4.
// } = config;
// const arr = [1, 2, , 4]; 
// const [first, second, third = 99, fourth] = arr;
// console.log("Host:", host);
// console.log("PORT:", PORT);
// console.log("Database Name:", dbName);
// console.log("Replica:", replica);
// console.log("Timeout:", timeout);
// console.log("Region:", region);

// console.log("First:", first);
// console.log("Second:", second);
// console.log("Third:", third);
// console.log("Fourth:", fourth);
// PORT = 8080
// dbName = "orders"
// replica = null
// timeout = 5000
// third = 99
//2.why replica ends up as null and NOT "primary",
//The default value ("primary") is used only if the property's value is undefined or the property does not exist.
//Since null is an actual value (not undefined), JavaScript keeps null and does not use the default value.
//3.The array arr has a hole (empty slot) at index 2: const arr = [1, 2, , 4];
//When destructuring: const [first, second, third = 99, fourth] = arr;
//the empty slot is treated as undefined. Since third has a default value of 99, JavaScript assigns: third = 99.



//==================================Task 2 — The Mutation Trap
const platformArrivals = [
    "Chennai Exp", 
    "Nellore Local", 
    "Bangalore SF", 
    "Vijayawada Pass"
]; 
function getSortedBoard(trains) {  
    return [...trains].sort(); //2.
}
const sortedBoard = getSortedBoard(platformArrivals); 
console.log("Sorted board:", sortedBoard); 
console.log("Original array:", platformArrivals);
//1.Arrays are reference types in JavaScript.
//When getSortedBoard(platformArrivals) is called, the parameter 'trains' does not receive a copy of the array. Instead, it receives a reference to the same array stored in platformArrivals.
//The sort() method sorts the array in place, meaning it modifies the original array instead of creating a new one.
//3. reverse()
const copiedArrivals = [...platformArrivals];
const reversedBoard = copiedArrivals.reverse();
console.log("Reversed board:", reversedBoard);
console.log("Copied array after reverse:", copiedArrivals);
console.log("Original array after reverse:", platformArrivals);
//mutate the original - sort() , reverse() ,splice()
//return a new array -  slice(), concat() ,map()
//4.
const lastTwoArrivals = platformArrivals.slice(-2);
console.log("Last two arrivals:", lastTwoArrivals);
console.log("Original array after slice:", platformArrivals);



//==================================Task 3 — Reduce Rebuilt
const orders = [  
    { id: 1, amount: 250, status: "paid" },  
    { id: 2, amount: 400, status: "pending" },  
    { id: 3, amount: 150, status: "paid" }, 
];
//1. myMap using only reduce()
function myMap(orders, fn) {
    return orders.reduce((result, order) => {
        result.push(fn(order));
        return result;
    }, []);
}
// myFilter using only reduce()
function myFilter(arr, fn) {
    return arr.reduce((result, current, index) => {
        if (fn(current, index, arr)) {
            result.push(current);
        }
        return result;
    }, []);
}
