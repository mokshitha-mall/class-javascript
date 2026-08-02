console.log("=============Example-1:map(),filter(),reduce()=========");
const prices=[10,25,8,40];
//map() : creates a new array by modifing every element
const withTax = prices.map((price) => price*10);
//filter() : creates a new array with elements that satisfy the condition
const affordable = prices.filter((price) => price < 30);
//reduce() : combines all elements into a single value
const total = prices.reduce((sum,price) => sum+price,0); //0 is default if we keer 10 it will add to the value
console.log("Original:",prices);
console.log("with Tax:",withTax);
console.log("Affordable:",affordable);
console.log("Total:",total);


console.log("=============Example-2:forEach=========");
//forEach() : Execute a function with every element (don't return a new array)
prices.forEach((price) => {
    console.log("Price:",price);
});

console.log("=============Example-3:find()========="); //first condition true means don't go to next condition
//forEach() : Execute a function with every element (don't return a new array)
const firstExpensive = prices.find((price) => price > 20);
console.log(firstExpensive);    //25

console.log("=============Example-4:some()=========");//check the condition if it is has in arry then it is true or it give false
//some() : Returns true if at least one element matches
const hasExpensive = prices.some((price) => price > 30);
console.log(hasExpensive);     //true

console.log("=============Example-5:every()=========");//checks if the all elements in arry is according to the condition if true out put is true or it give false
//ever() : Returns true if all elements match
const allAffordable = prices.every((price) => price < 50);
console.log(allAffordable);     //true

console.log("=============Example-6:includes()========="); //perticular value is existing or not(true or false)
//includes() : checks whether a value exists
console.log(prices.includes(25));    //true
console.log(prices.includes(100));   //false

console.log("=============Example-7:reverse()=========");
//reverse() : reverses the array
const reverse = [...prices].reverse();
console.log(reverse);  //[ 40, 8, 25, 10 ]

console.log("=============Example-8:slice()========="); 
//slice() : Returns part of an array(original remains unchanged)
const firstTwo = prices.slice(0,2);
console.log(firstTwo)   //[ 10, 25 ]

console.log("=============Example-9:concat()========="); // combin two arrays(if you have two arrays)
//concat() : combines arrays
const morePrices = [50,60];
const combined = prices.concat(morePrices);
console.log(combined);        //[ 10, 25, 8, 40, 50, 60 ]

console.log("=============Example-10:sort()========="); //it sub two numbers if we got negitive it don't give output, if positie it swaps
//sort() : sorts the array
const sorted = [...prices].sort((a,b) => a-b);
console.log(sorted);

console.log("=============Example-11:join()========="); //it add one element
//join() : converts array into a string
console.log(prices.join(", "));  //10, 25, 8, 40
console.log(prices.join(" - "));  //10 - 25 - 8 - 40

