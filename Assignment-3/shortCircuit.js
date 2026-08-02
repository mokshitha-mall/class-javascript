const emptyQueue = [];
const ticketPrices = [120, 85, 300, 60];
// 1. Predict the results before running:
/*
Prediction:
emptyQueue.every(price => price > 0) = true
emptyQueue.some(price => price > 0) = false
*/
const everyResult = emptyQueue.every(price => price > 0);
const someResult = emptyQueue.some(price => price > 0);
console.log("every() on empty array:", everyResult);
console.log("some() on empty array:", someResult);
/*
every() returns true because there are no elements that fail the condition. This is called "vacuous truth."
some() returns false because there are no elements that satisfy the condition.
*/
// 2. some() stops when it finds the first match
const hasPriceAbove250 = ticketPrices.some(price => {
    console.log("Checking (some):", price);
    return price > 250;
});
console.log("Price above 250:", hasPriceAbove250);

/*
some() checks:
120
85
300

It stops at 300 because the condition becomes true.
It does not check 60.
*/
// 3. every() stops when one element fails
const allAbove100 = ticketPrices.every(price => {
    console.log("Checking (every):", price);
    return price > 100;
});
console.log("All prices above 100:", allAbove100);
/*
every() checks:
120
85
It stops at 85 because the condition fails.
It does not check 300 or 60.
*/

// 4. find() returns the first matching value
const firstPriceAbove250 = ticketPrices.find(price => price > 250);
console.log("First price above 250:", firstPriceAbove250);

/*
Why use find() instead of filter()[0]?

find() stops as soon as it finds the first matching element, making it more efficient.
filter() checks every element and creates a new array, even if only the first matching value is needed.
*/