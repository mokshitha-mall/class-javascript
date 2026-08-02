//==========================================Task-2(Fix the Silent Race Condition)
function stationOneWork() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(" Parcel sorted at Station 1"), 1500);
    });
}
function stationTwoWork(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(` Station 2 processed: ${data}`), 500);
    });
}
function runPipeline() {
    return Promise.resolve(" Parcel dispatched")
    .then((data) => {
        console.log("Step 1:", data);
        return stationOneWork(); // BUG: result is never returned or awaited
    })
    .then((data) => {
        console.log("Step 2:", data); // logs "undefined" instead of Station 1's result
        return stationTwoWork(data);
    })
    .then((finalData) => {
        console.log("Step 3:", finalData);
    });
}
runPipeline();
// 1.Step 1:  Parcel dispatched
//   Step 2: undefined
//   Step 3:  Station 2 processed: undefined (above 500ms later)
// 2.line 47 write return stationOneWork();
// Step 1:  Parcel dispatched
// Step 2:  Parcel sorted at Station 1
// Step 3:  Station 2 processed:  Parcel sorted at Station 1
// 3. 
function stationOneWork() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(" Parcel sorted at Station 1"), 1500);
    });
}
function stationTwoWork(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(` Station 2 processed: ${data}`), 500);
    });
}
async function runPipeline() {
    const data = await Promise.resolve(" Parcel dispatched");
    console.log("Step 1:", data); //await wait for the promice to resolve. 

    const station1Result = await stationOneWork();
    console.log("Step 2:", station1Result);

    const finalData = await stationTwoWork(station1Result);
    console.log("Step 3:", finalData);
}
runPipeline();
// 4.When a Promise is not returned inside a .then() callback, JavaScript does not throw an error 
// because not returning a value is valid. The callback automatically returns undefined
// .then() undefined As a result, the Promise chain
// continues immediately without waiting finish, causing incorrect data to be passed to the next step.
