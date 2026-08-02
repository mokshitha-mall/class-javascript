const orders = [
    { id: 1, amount: 250, status: "paid" },
    { id: 2, amount: 400, status: "pending" },
    { id: 3, amount: 150, status: "paid" },
];

// 1. myMap using reduce()
function myMap(orders, fn) {
    return orders.reduce((result, order) => {
        result.push(fn(order));
        return result;
    }, []);
}

// 1. myFilter using reduce()
function myFilter(orders, fn) {
    return orders.reduce((result, order) => {
        if (fn(order)) {
            result.push(order);
        }
        return result;
    }, []);
}

// 2. Get only paid orders, extract their amounts, and calculate the total using reduce().
const paidOrders = myFilter(orders, (order) => order.status === "paid");
console.log("Paid Orders:", paidOrders);

const paidAmounts = myMap(paidOrders, (order) => order.amount);
console.log("Paid Amounts:", paidAmounts);

const total = paidAmounts.reduce((sum, amount) => sum + amount, 0);
console.log("Total Paid Amount:", total);

// 3. Running reduce() without an initial value.
const wrongTotal = orders.reduce((sum, order) => sum + order.amount);
console.log("Wrong Total:", wrongTotal);

/*
3. Why is this dangerous?

When no initial value is given, reduce() uses the first element
of the array as the accumulator.

Here:
sum = { id: 1, amount: 250, status: "paid" }
On the next iteration, JavaScript tries:
sum + order.amount
which becomes:
object + 400

This produces a string like:

"[object Object]400150"

instead of a numeric total.

Always provide an initial value when the accumulator
is a different type from the array elements.
*/

/*
4. Rule:

You MUST provide an initial value when the accumulator
is different from the array elements or when the array
might be empty.

Safe to omit:

When reducing a non-empty array of numbers to another number.

Example:

const numbers = [10, 20, 30];
const sum = numbers.reduce((a, b) => a + b);

console.log(sum); // 60
*/