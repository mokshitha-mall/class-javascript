console.log("\n============PURE FUNCTION==============");
//A pure function same input -> same output, dont modify any thing outside the function.
function add(a,b){
    return a+b;
}
console.log(add(2,3));  //5
console.log(add(2,3));  //5
console.log(add(2,3));  //5

console.log("\n============IMPURE FUNCTION==============");
//External vale
let count =0;
//Impure function : same input -> different output, uses external data(count), so the output changes.
function addImpure(a,b){
    count++;
    return a+b+count;
}
console.log("calling addImpure(2,3) multiple times:");
console.log(addImpure(2,3));  //5
console.log(addImpure(2,3));  //6
console.log(addImpure(2,3));  //7


console.log("=============Mutable Example==============");
let fruits1 = ["Apple","Banana"];
console.log("Before:",fruits1);
//modifies the original array
fruits1.push("Mango");
console.log("After:",fruits1);


console.log("=============Immutable Example==============");
let fruits2 = ["Apple","Banana"];
console.log("Original:",fruits2);
//creates a new array with out changing the original
let newFruits = [...fruits2,"Mango"];
console.log("Original:",fruits2);
console.log("New:",newFruits);


