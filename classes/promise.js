// //promise.all
// const fruits1 = Promise.resolve("Apple");
// const fruits2 = Promise.resolve("Banana");
// const fruits3 = Promise.resolve("Orange");
// const fruits4 = Promise.resolve();

// Promise.all([fruits1, fruits2, fruits3, fruits4])
// .then((result) => {
//     console.log("Promise.all:", result);
//     throw new Error("Promise.all is undifined")
// })
// .catch((error) => {
//     console.log("Error:", error.message);
// })
// .finally(() => {
//     console.log("Successfully all fruits are declared");
// });
// Promise.allSettled([fruits1, fruits2, fruits3])
// .then((result) => {
//     console.log("Promise.allSettled:", result);
//     throw new Error("Promise.allSettled is undifined")
// })
// .catch((error) => {
//     console.log("Error:", error.message);
// })
// .finally(() => {
//     console.log("Promise.allSettled Successfully all fruits are declared");
// });
// Promise.any([fruits1, fruits2, fruits3])
// .then((result) => {
//     console.log("any:", result);
//     throw new Error("Promise.any is undifined")
// })
// .catch((error) => {
//     console.log("Error:", error.message);
// })
// .finally(() => {
//     console.log("Promise.any Successfully all fruits are declared");
// });



