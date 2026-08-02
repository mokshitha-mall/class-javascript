const config = {
    host: "localhost",
    port: 8080,
    db: {
        name: "orders",
        replica: null
    }
};

const {
    host,
    port: PORT,
    db: {
        name: dbName,
        replica = "primary"
    },
    timeout = 5000,
    region = "ap-south-1"
} = config;

const arr = [1, 2, , 4];

const [first, second, third = 99, fourth] = arr;

console.log("Host:", host);
console.log("PORT:", PORT);
console.log("Database Name:", dbName);
console.log("Replica:", replica);
console.log("Timeout:", timeout);
console.log("Region:", region);
console.log("First:", first);
console.log("Second:", second);
console.log("Third:", third);
console.log("Fourth:", fourth);
/* 1....PORT = 8080
dbName = "orders"
replica = null
timeout = 5000
third = 99
*/
/*2......
Why is replica null instead of "primary"?
The default value ("primary") is used only if the property's value is
undefined or the property does not exist.
In this object:
config.db.replica === null
Since null is an actual value (not undefined), JavaScript keeps null
and does not use the default value.*/
/*3......
The array arr has a hole (empty slot) at index 2:
const arr = [1, 2, , 4];
When destructuring:
const [first, second, third = 99, fourth] = arr;
the empty slot is treated as undefined. Since third has a default value
of 99, JavaScript assigns:
third = 99
Difference from arr[2]:
arr[2] returns undefined because there is no value at index 2.
During destructuring, that undefined value causes the default value (99)
to be used.*/
