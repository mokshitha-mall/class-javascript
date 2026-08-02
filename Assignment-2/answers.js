/*
1. If 3 .then() calls are chained onto an already-resolved promise,
   and setTimeout(fn, 0) is also queued, the 3 .then() callbacks run first.

   Why?
   Promise .then() callbacks are microtasks, while setTimeout callbacks
   are macrotasks/timer callbacks. Microtasks are processed before timers.

2. await does NOT block the entire JavaScript engine.
   It pauses only the current async function while other synchronous code,
   timers, and other tasks can continue running.

3. With a normal for...of loop over a plain generator, the loop variable
   receives the Promise object itself, not the resolved value.

   A normal generator does not automatically await promises.
   To get resolved values, you need to await the promises separately.

4. Promise.allSettled() has exactly two possible status values:

   status: "fulfilled"
       → accompanied by a value field.

   status: "rejected"
       → accompanied by a reason field.
*/