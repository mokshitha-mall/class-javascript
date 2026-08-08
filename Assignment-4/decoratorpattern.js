function withExecutionTime(fn) {
    return function (...args) {
        const start = performance.now();
        const result = fn(...args);
        const end = performance.now();

        //Execution time
        console.log(
            `Execution Time: ${(end - start).toFixed(2)} ms`
        );

        return result;
    };
}

function calculateTotal(a, b) {
    return a + b;
}

const decoratedFunction = withExecutionTime(calculateTotal);
console.log("Result:", decoratedFunction(100, 200));

/*output :
Execution Time: 0.02 ms
Result: 300
*/