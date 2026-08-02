//==========================================Task-5(First success wins)
const mirror1 = new Promise((_, reject) => setTimeout(() => reject("Mirror 1 down"), 200)); 
const mirror2 = new Promise((resolve) => setTimeout(() => resolve("Mirror 2 OK"), 800)); 
const mirror3 = new Promise((_, reject) => setTimeout(() => reject("Mirror 3 down"), 400));
//1.Promise.race() : returns the first promise that settles.
Promise.race([mirror1, mirror2, mirror3])
    .then((result) => {
        console.log("Race Success:", result);
    })
    .catch((error) => {
        console.log("Race Error:", error);
    })
    .finally(() => {
        console.log("Promise.race Completed");
    });
//2.Promise.any() : ignores rejected promises.
Promise.any([mirror1, mirror2, mirror3])
    .then((result) => {
        console.log("Any Success:", result);
    })
    .catch((error) => {
        console.log("Any Error:", error);
    })
    .finally(() => {
        console.log("Promise.any Completed");
    });
//3.all mirrors fail
const mirror4 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 4 down"), 600)
);

// Make mirror2 fail as well
const failedMirror2 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 2 down"), 800)
);
async function checkMirrors() {
    try {
        const result = await Promise.any([        //Promise.any() throws an AggregateError when every input promise rejects.
            mirror1,
            failedMirror2,
            mirror3,
            mirror4
        ]);
        console.log(result);
    } catch (error) {
        console.log("Caught Error:", error);
    }
}
checkMirrors();

