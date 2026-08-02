console.log("=================================");
console.log("SET EXAMPLES");
console.log("=================================");

//ex -1 : Remove duplicate value
console.log("\n=== Example Duplicate Values ===")
const numbers = [1,2,3,4,4,5];
const uniqueNumbers = [...new Set(numbers)];
console.log("Original : ", numbers);
console.log("unique : ", uniqueNumbers);

//ex -2 : add()
console.log("\n=== Example 2: add() ===");
const fruits = new Set();
fruits.add("Apple");
fruits.add("Mango");
fruits.add("Apple");  //duplicate
console.log(fruits);

//ex-3 : has()
console.log("\n=== Example 3: has() ===");
console.log(fruits.has("Apple"));
console.log(fruits.has("Mango"));

//ex-4 : delete()
fruits.delete("Apple");
console.log(fruits);

//ex-5 : size
console.log("\nn=== Example 5: size === ");
console.log(fruits.size);

//ex-6 : Loop through Set
console.log("\n=== Example 3: for...of ===");
const colors = new Set(["Red","Green","Blue"]);  //constructure
for(const color of colors) {
    console.log(color);
}

console.log("=================================");
console.log("SET EXAMPLES");
console.log("=================================");

//ex-1 : set()
console.log("\n=== Example 1: set() ===");
const marks = new Map();
marks.set("Moksha",95);
marks.set("Tabu",88);
console.log(marks);

//ex-2 : get()
console.log("\n=== Example 2: get() ===");
console.log(marks.get("Moksha"));
console.log(marks.get("Tabu"));

//ex-3 : has()
console.log("\n=== Example 3: has() ===");
console.log(marks.has("Moksha"));
console.log(marks.has("swetha"));

//ex-4 : delete()
console.log("\n=== Example 4: has() ===");
marks.delete("Tabu");
console.log(marks);

//ex-5 : size()
console.log("\n=== Example 5: size() ===");
console.log(marks.size);

