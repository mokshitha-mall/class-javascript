//==========================================Task-1( Predict the Exact Output)

console.log("A. Station Master starts duty");
setTimeout(() => console.log("B. Late train arrives"), 0);
const announce = setInterval(() => {
    console.log("C. Repeated announcement");
}, 100);
Promise.resolve()
    .then(() => console.log("D. Microtask 1"))
    .then(() => console.log("E. Microtask 2"));
setTimeout(() => {
    console.log("F. Clearing announcements");
    clearInterval(announce);
}, 250);
console.log("G. Station Master ends duty");
// 1. A,G,D,E,B(A,G -> console.log()  ,D,E -> promise  ,B->setTimeout(callback))
// 2. A. Station Master starts duty
// G. Station Master ends duty
// D. Microtask 1
// E. Microtask 2
// B. Late train arrives
// C. Repeated announcement
// C. Repeated announcement
// F. Clearing announcements
// 3. The Promise callbacks "D" and "E" & Promise microtasks always have higher priority than setTimeout callbacks ,so that why "D" and "E" print before "B"
// 4."C" prints every ~100 ms because setInterval() repeatedly schedules(setInterval(..., 100)), it does not stop automatically ,clearInterval(announce) stops the repeated execution.
// If you don't call clearInterval(), the interval keeps scheduling new callbacks, so the .js process stays alive and does not terminate automatically.


