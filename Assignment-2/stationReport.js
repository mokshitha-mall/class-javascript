//==========================================Task-4(Partial failure report)
function checkStation(name, willFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willFail) reject(new Error(`${name} is OFFLINE`));
            else resolve(`${name} is OK`);
        }, Math.random() * 1000);
    });
}
const stations = [  
    checkStation("Chennai", false),  
    checkStation("Bangalore", true),  
    checkStation("Vijayawada", false),  
    checkStation("Nellore", true), 
];
//1......
Promise.all(stations)
    .then((result) => {
        console.log("All Stations:", result);
    })
    .catch((error) => {          //Even though Nellore also fails,Promise.all() reports only the first rejection.
        console.log("Promise.all Error:", error.message);
    })
    .finally(() => {
        console.log("Promise.all Completed");
    });
// 2 & 3. Promise.allSettled()
Promise.allSettled(stations)
    .then((results) => {
        const summary = {
            okCount: 0,
            failedCount: 0,
            failedStations: []
        };
        results.forEach((result) => {
            if (result.status === "fulfilled") {
                summary.okCount++;
            } else {
                summary.failedCount++;
                summary.failedStations.push(result.reason.message);
            }
        });
        console.log("Summary:", summary);
    })
    .finally(() => {
        console.log("Promise.allSettled Completed");
    });
/*
4.....
Promise.all() -> Use when every promise must succeed.
Promise.allSettled() -> Use when you want the result of every promise,
whether it succeeds or fails.
*/
