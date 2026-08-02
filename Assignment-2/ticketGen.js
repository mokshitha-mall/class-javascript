//==========================================Task-6(Async generator ticket counter)
// Async Generator Function
async function* issueTickets(count) {
    for (let i = 1; i <= count; i++) {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
        // Yield the next ticket
        yield `Ticket #${i} issued`;
    }
}
async function printTickets() {
    for await (const ticket of issueTickets(5)) {
        console.log(ticket);
    }
}
printTickets();
async function printTickets() {
    for await (const ticket of issueTickets(4)) {
        console.log(ticket);
    }
}
printTickets();
//2.....await....of
async function printTickets() {
    for await (const ticket of issueTickets(4)) {
        console.log(ticket);
    }
}
printTickets();
// 3. Manually call .next() 
async function manualNext() {
    const generator = issueTickets(4);
    const first = await generator.next();
    console.log(first);
    const second = await generator.next();
    console.log(second);
}
manualNext();
/*
4. Difference between function* and async function*
Normal function*
- .next() returns an object immediately.
- Example:
  { value: ..., done: false }
async function*
- .next() returns a Promise.
- You must use await or .then() to get:
  { value: ..., done: false }
*/
