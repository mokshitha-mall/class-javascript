//==========================================Task-3(Timeout Race)
function unreliableServer(delayMs, label) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(` Response from ${label}`), delayMs);
    });
}
//1 & 2............
function withTimeout(promise, ms) {          //original promise(server request)
    return Promise.race([                   //Promise.race() starts both the server promise and the timeout promise.
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Timeout"));
            }, ms);
        })
    ]);
};
withTimeout(unreliableServer(3000, "Server A"), 1000)
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.log("Error:", error.message);
    })
    .finally(() => {
        console.log("Request 1 Completed");
    });

// 3. Server takes 500ms, timeout is 1000ms
withTimeout(unreliableServer(500, "Server B"), 1000)
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.log("Error:", error.message);
    })
    .finally(() => {
        console.log("Request 2 Completed");
    });
/*4...........Promise.race() only returns the result of the promise that settles first.
It does not stop or cancel the other promise.
............After 1000ms, the timeout promise rejects and Promise.race() finishes.
However, the original Server A setTimeout is still running in the background.
After 3000ms, it will still execute its resolve() function, but its result is
ignored because Promise.race() has already settled.This happens because JavaScript Promises do not have built-in cancellation.
Promise.race() simply waits for the first promise to settle; it cannot stop
the "losing" promise.(The "losing" promise continues running in the background until it finishes.)
.............o truly stop an operation (such as a network request), use AbortController with APIs like fetch()
*/

