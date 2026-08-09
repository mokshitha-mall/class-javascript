"use strict";


/* ======================================================
   PART 1 - IMMUTABILITY
====================================================== */

// Deep freeze
function deepFreeze(value, seen = new WeakSet()) {
    // null is not an object
    if (value === null) {
        return value;
    }

    // Only objects and functions can be frozen
    if (typeof value !== "object" && typeof value !== "function") {
        return value;
    }

    // Circular reference protection
    if (seen.has(value)) {
        return value;
    }

    seen.add(value);

    // Freeze nested values first
    for (const key of Reflect.ownKeys(value)) {
        deepFreeze(value[key], seen);
    }

    return Object.freeze(value);
}


// Pure nested update
function updateAtPath(object, path, updater) {
    if (!Array.isArray(path)) {
        throw new TypeError("path must be an array");
    }

    if (path.length === 0) {
        return updater(object);
    }

    const [key, ...rest] = path;

    if (object === null || typeof object !== "object") {
        throw new TypeError(`Cannot access "${key}"`);
    }

    const oldValue = object[key];

    const newValue = updateAtPath(oldValue, rest, updater);

    // If nothing changed, return the original object
    if (newValue === oldValue) {
        return object;
    }

    // Preserve the original prototype
    const copy = Array.isArray(object)
        ? object.slice()
        : { ...object };

    copy[key] = newValue;

    return copy;
}


/* Test deepFreeze */

const circular = {
    name: "test",
    child: {
        value: 10
    }
};

circular.self = circular;

deepFreeze(circular);

console.log("Deep freeze:", Object.isFrozen(circular));
console.log("Nested freeze:", Object.isFrozen(circular.child));


// Test updateAtPath

const originalState = {
    user: {
        name: "Mokshitha",
        address: {
            city: "Nellore"
        }
    },
    cart: {
        items: ["Laptop", "Mouse"]
    }
};

const newState = updateAtPath(
    originalState,
    ["user", "address", "city"],
    () => "Hyderabad"
);

console.log("Original city:", originalState.user.address.city);
console.log("New city:", newState.user.address.city);

// Untouched branch is shared
console.log(
    "Cart reference shared:",
    originalState.cart === newState.cart
);

// Changed branch is new
console.log(
    "User reference changed:",
    originalState.user !== newState.user
);


/* ======================================================
   PART 2 - COMPOSITION
====================================================== */

// Left-to-right
function pipe(...functions) {
    return function (...args) {
        if (functions.length === 0) {
            return args[0];
        }

        let result = functions[0](...args);

        for (let i = 1; i < functions.length; i++) {
            result = functions[i](result);
        }

        return result;
    };
}


// Right-to-left
function compose(...functions) {
    return pipe(...functions.reverse());
}


// Side-effect helper
function tap(sideEffect) {
    return function (value) {
        sideEffect(value);
        return value;
    };
}


// Async composition
function asyncPipe(...functions) {
    return async function (...args) {
        if (functions.length === 0) {
            return args[0];
        }

        let result = await functions[0](...args);

        for (let i = 1; i < functions.length; i++) {
            result = await functions[i](result);
        }

        return result;
    };
}


// Multiple arguments on first step
const calculate = pipe(
    (a, b) => a + b,
    value => value * 2,
    value => value + 10
);

console.log("Pipe multiple arguments:", calculate(5, 10));


// Composition test
const addOne = x => x + 1;
const double = x => x * 2;
const subtractThree = x => x - 3;

const leftToRight = pipe(
    addOne,
    double,
    subtractThree
);

const rightToLeft = compose(
    subtractThree,
    double,
    addOne
);

console.log("Pipe result:", leftToRight(5));
console.log("Compose reverse result:", rightToLeft(5));

console.log(
    "Pipe and reverse compose are equal:",
    leftToRight(5) === rightToLeft(5)
);


// tap test
const tapExample = pipe(
    x => x * 2,
    tap(value => console.log("Debug value:", value)),
    x => x + 5
);

console.log("Tap result:", tapExample(10));


// Async pipe test
const asyncExample = asyncPipe(
    x => x + 5,

    async x => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return x * 2;
    },

    x => x + 10
);

asyncExample(5).then(result => {
    console.log("Async pipe result:", result);
});


/* ======================================================
   PART 3 - MODULE + SINGLETON
====================================================== */

// Store module
const StoreModule = (() => {

    let instance = null;


    function createStore(reducer, initialState, options = {}) {

        if (instance) {
            throw new Error("Store already exists. Use StoreModule.getStore()");
        }

        const devMode = options.dev !== false;

        // Private state
        let state = initialState;

        const subscribers = new Set();
        const onceSubscribers = new Set();
        const wildcardSubscribers = new Set();

        let isNotifying = false;
        const dispatchQueue = [];


        function getSnapshot() {
            if (devMode) {
                return deepFreeze(state);
            }

            return state;
        }


        function notify(action) {

            if (isNotifying) {
                return;
            }

            isNotifying = true;

            try {

                // Snapshot protects notification from modification
                const normalListeners = [...subscribers];
                const onceListeners = [...onceSubscribers];
                const wildcardListeners = [...wildcardSubscribers];

                for (const listener of normalListeners) {

                    // Listener may have unsubscribed itself
                    if (subscribers.has(listener)) {
                        try {
                            listener(getSnapshot(), action);
                        } catch (error) {
                            console.error(
                                "Subscriber error:",
                                error.message
                            );
                        }
                    }
                }


                for (const listener of onceListeners) {

                    if (onceSubscribers.has(listener)) {

                        // Remove before calling
                        onceSubscribers.delete(listener);

                        try {
                            listener(getSnapshot(), action);
                        } catch (error) {
                            console.error(
                                "One-shot subscriber error:",
                                error.message
                            );
                        }
                    }
                }


                for (const listener of wildcardListeners) {

                    if (wildcardSubscribers.has(listener)) {

                        try {
                            listener(
                                getSnapshot(),
                                action,
                                action.type
                            );
                        } catch (error) {
                            console.error(
                                "Wildcard subscriber error:",
                                error.message
                            );
                        }
                    }
                }

            } finally {
                isNotifying = false;
            }


            // Handle queued dispatches
            if (dispatchQueue.length > 0) {

                const queuedActions = dispatchQueue.splice(
                    0,
                    dispatchQueue.length
                );

                for (const queuedAction of queuedActions) {
                    dispatch(queuedAction);
                }
            }
        }


        function dispatch(action) {

            if (isNotifying) {
                dispatchQueue.push(action);
                return action;
            }

            if (!action || typeof action.type !== "string") {
                throw new TypeError(
                    "Action must contain a string type"
                );
            }

            /*
            IMPORTANT:
            Freeze state BEFORE reducer receives it.
            This makes mutation fail.
            */
            if (devMode) {
                deepFreeze(state);
            }

            const previousState = state;

            const nextState = reducer(state, action);

            if (nextState === undefined) {
                throw new Error(
                    "Reducer must return a state"
                );
            }

            state = nextState;

            notify(action);

            return action;
        }


        function subscribe(listener) {

            subscribers.add(listener);

            return function unsubscribe() {
                subscribers.delete(listener);
            };
        }


        function subscribeOnce(listener) {

            onceSubscribers.add(listener);

            return function unsubscribe() {
                onceSubscribers.delete(listener);
            };
        }


        function subscribeWildcard(listener) {

            wildcardSubscribers.add(listener);

            return function unsubscribe() {
                wildcardSubscribers.delete(listener);
            };
        }


        function reset() {

            state = initialState;

            subscribers.clear();
            onceSubscribers.clear();
            wildcardSubscribers.clear();

            dispatchQueue.length = 0;
        }


        const store = {
            getState: getSnapshot,
            dispatch,
            subscribe,
            subscribeOnce,
            subscribeWildcard,
            reset
        };

        instance = store;

        return store;
    }


    function getStore() {
        if (!instance) {
            throw new Error("Store has not been created");
        }

        return instance;
    }


    function resetSingleton() {
        instance = null;
    }


    return {
        createStore,
        getStore,
        resetSingleton
    };

})();


/* ======================================================
   PART 4 - PUB-SUB
====================================================== */

// Pub-sub is already implemented inside StoreModule.

// Normal subscriber:
// store.subscribe(listener)

// One-shot subscriber:
// store.subscribeOnce(listener)

// Wildcard subscriber:
// store.subscribeWildcard(listener)

// Re-entrant dispatches are queued instead of recursively
// calling dispatch.


/* ======================================================
   PART 5 - FACTORY
====================================================== */

// Action creator factory
function createActionCreator(type) {

    return function actionCreator(payload) {

        if (payload === undefined) {
            return {
                type
            };
        }

        return {
            type,
            payload
        };
    };
}


// Create actions
const addAction = createActionCreator("ADD");
const removeAction = createActionCreator("REMOVE");
const discountAction = createActionCreator("DISCOUNT");


console.log(
    "Action:",
    addAction({
        id: 1,
        name: "Laptop",
        price: 50000
    })
);


/* ======================================================
   DECORATORS
====================================================== */

function preserveFunctionMetadata(wrapper, original) {

    Object.defineProperty(wrapper, "name", {
        value: original.name,
        configurable: true
    });

    Object.defineProperty(wrapper, "length", {
        value: original.length,
        configurable: true
    });

    return wrapper;
}


// Logging decorator
function withLogging(dispatch) {

    const wrapped = function (...args) {

        console.log(
            `[LOG] Dispatching:`,
            args[0]
        );

        const result = dispatch(...args);

        console.log(
            `[LOG] Finished:`,
            args[0].type
        );

        return result;
    };

    return preserveFunctionMetadata(wrapped, dispatch);
}


// Timing decorator
function withTiming(dispatch) {

    const wrapped = function (...args) {

        const start = Date.now();

        try {
            return dispatch(...args);
        } finally {

            const time = Date.now() - start;

            console.log(
                `[TIMING] ${args[0].type}: ${time}ms`
            );
        }
    };

    return preserveFunctionMetadata(wrapped, dispatch);
}


// Validation decorator
function withValidation(dispatch, validator) {

    const wrapped = function (...args) {

        if (!validator(args[0])) {
            throw new Error(
                "Action validation failed"
            );
        }

        return dispatch(...args);
    };

    return preserveFunctionMetadata(wrapped, dispatch);
}


// Async retry with backoff
function withRetry(dispatch, retries = 3, delay = 100) {

    const wrapped = async function (...args) {

        let attempt = 0;

        while (true) {

            try {
                return await dispatch(...args);

            } catch (error) {

                attempt++;

                if (attempt > retries) {
                    throw error;
                }

                const waitTime = delay * attempt;

                console.log(
                    `[RETRY] Attempt ${attempt}`
                );

                await new Promise(resolve =>
                    setTimeout(resolve, waitTime)
                );
            }
        }
    };

    return preserveFunctionMetadata(wrapped, dispatch);
}


// Memoization decorator
function withMemoization(dispatch, keyFunction) {

    const cache = new Map();

    const wrapped = function (...args) {

        const key = keyFunction(...args);

        if (cache.has(key)) {
            console.log("[MEMO] Returning cached result");
            return cache.get(key);
        }

        const result = dispatch(...args);

        cache.set(key, result);

        return result;
    };

    return preserveFunctionMetadata(wrapped, dispatch);
}


/* ======================================================
   FINAL APP
   ORDER TRACKING
====================================================== */


const initialOrderState = {
    cart: {
        items: []
    },

    discount: 0
};


// Pure reducer
function orderReducer(state, action) {

    switch (action.type) {

        case "ADD":

            return updateAtPath(
                state,
                ["cart", "items"],
                items => [
                    ...items,
                    action.payload
                ]
            );


        case "REMOVE":

            return updateAtPath(
                state,
                ["cart", "items"],
                items =>
                    items.filter(
                        item => item.id !== action.payload
                    )
            );


        case "DISCOUNT":

            return updateAtPath(
                state,
                ["discount"],
                () => action.payload
            );


        default:
            return state;
    }
}


/* ======================================================
   CREATE SINGLETON STORE
====================================================== */

const store = StoreModule.createStore(
    orderReducer,
    initialOrderState,
    {
        dev: true
    }
);


/* ======================================================
   THREE INDEPENDENT SUBSCRIBERS
====================================================== */

// Subscriber 1 - Cart UI
const unsubscribeCart = store.subscribe(
    state => {
        console.log(
            "UI Cart:",
            state.cart.items
        );
    }
);


// Subscriber 2 - Discount UI
store.subscribe(
    state => {
        console.log(
            "UI Discount:",
            state.discount
        );
    }
);


// Subscriber 3 - Total UI
store.subscribe(
    state => {

        const total = state.cart.items.reduce(
            (sum, item) => sum + item.price,
            0
        );

        console.log(
            "UI Total:",
            total
        );
    }
);


/* ======================================================
   ONE-SHOT SUBSCRIBER
====================================================== */

store.subscribeOnce(
    (state, action) => {
        console.log(
            "ONE SHOT:",
            action.type
        );
    }
);


/* ======================================================
   WILDCARD SUBSCRIBER
====================================================== */

store.subscribeWildcard(
    (state, action, eventName) => {

        console.log(
            "WILDCARD EVENT:",
            eventName
        );
    }
);


/* ======================================================
   SELF-UNSUBSCRIBING SUBSCRIBER
====================================================== */

let unsubscribeSelf;

unsubscribeSelf = store.subscribe(
    () => {

        console.log(
            "Self-unsubscribing subscriber"
        );

        unsubscribeSelf();
    }
);


/* ======================================================
   SUBSCRIBER THAT THROWS
====================================================== */

store.subscribe(
    () => {
        throw new Error(
            "Intentional subscriber error"
        );
    }
);


/* ======================================================
   RE-ENTRANCY TEST
====================================================== */

let count = 0;

store.subscribe(
    (state, action) => {

        if (action.type === "ADD" && count < 1) {

            count++;

            console.log(
                "Subscriber dispatching another action..."
            );

            store.dispatch(
                discountAction(10)
            );
        }
    }
);


/* ======================================================
   VALIDATION
====================================================== */

function validateAction(action) {

    return (
        action &&
        typeof action.type === "string"
    );
}


/* ======================================================
   DECORATED DISPATCH
====================================================== */

const decoratedDispatch = pipe(

    dispatch =>
        withLogging(dispatch),

    dispatch =>
        withTiming(dispatch),

    dispatch =>
        withValidation(
            dispatch,
            validateAction
        )
)(
    store.dispatch
);


console.log(
    "Original dispatch name:",
    store.dispatch.name
);

console.log(
    "Decorated dispatch name:",
    decoratedDispatch.name
);

console.log(
    "Original dispatch length:",
    store.dispatch.length
);

console.log(
    "Decorated dispatch length:",
    decoratedDispatch.length
);


/* ======================================================
   DISPATCH ACTIONS
====================================================== */

console.log("\n===== ADD LAPTOP =====");

decoratedDispatch(
    addAction({
        id: 1,
        name: "Laptop",
        price: 50000
    })
);


console.log("\n===== ADD MOUSE =====");

decoratedDispatch(
    addAction({
        id: 2,
        name: "Mouse",
        price: 1000
    })
);


console.log("\n===== DISCOUNT =====");

decoratedDispatch(
    discountAction(20)
);


console.log("\n===== REMOVE MOUSE =====");

decoratedDispatch(
    removeAction(2)
);


/* ======================================================
   IMMUTABILITY ASSERTIONS
====================================================== */

console.log("\n===== ASSERTIONS =====");


const before = store.getState();

const after = updateAtPath(
    before,
    ["cart", "items"],
    items => [
        ...items,
        {
            id: 3,
            name: "Keyboard",
            price: 2000
        }
    ]
);


// Original state unchanged
console.assert(
    before.cart.items.length !==
    after.cart.items.length,
    "Original state should not change"
);


// Untouched branch shared
console.assert(
    before.cart === after.cart,
    "cart should be shared"
);


/*
Actually items changed, so cart must be a new reference.
The discount branch was untouched and should be shared.
*/

console.assert(
    before.discount === after.discount,
    "Untouched discount value should be shared"
);


// New root object
console.assert(
    before !== after,
    "Root object must be new"
);


// Snapshot frozen
console.assert(
    Object.isFrozen(store.getState()),
    "Snapshot must be frozen"
);


// State is not directly visible
console.assert(
    !Object.prototype.hasOwnProperty.call(
        store,
        "state"
    ),
    "State should be private"
);


// Decorated dispatch metadata
console.assert(
    decoratedDispatch.name === store.dispatch.name,
    "Function name should be preserved"
);

console.assert(
    decoratedDispatch.length === store.dispatch.length,
    "Function arity should be preserved"
);


console.log("All assertions completed.");


/* ======================================================
   UNSUBSCRIBE TEST
====================================================== */

console.log("\n===== UNSUBSCRIBE TEST =====");

unsubscribeCart();

decoratedDispatch(
    addAction({
        id: 4,
        name: "Keyboard",
        price: 2000
    })
);


/* ======================================================
   DECORATOR ORDER TEST
====================================================== */

console.log("\n===== DECORATOR ORDER TEST =====");

function fakeDispatch(action) {
    console.log("DISPATCH:", action.type);
}


// Logging -> Validation
const loggingThenValidation = pipe(
    dispatch =>
        withLogging(dispatch),

    dispatch =>
        withValidation(
            dispatch,
            action => action.type === "VALID"
        )
)(fakeDispatch);


// Validation -> Logging
const validationThenLogging = pipe(
    dispatch =>
        withValidation(
            dispatch,
            action => action.type === "VALID"
        ),

    dispatch =>
        withLogging(dispatch)
)(fakeDispatch);


console.log(
    "\nLogging then validation:"
);

try {
    loggingThenValidation({
        type: "INVALID"
    });
} catch (error) {
    console.log(
        "Error:",
        error.message
    );
}


console.log(
    "\nValidation then logging:"
);

try {
    validationThenLogging({
        type: "INVALID"
    });
} catch (error) {
    console.log(
        "Error:",
        error.message
    );
}


/*
WHY DOES ORDER MATTER?

Logging -> Validation:
The logger runs first, so the invalid action is logged
before validation rejects it.

Validation -> Logging:
Validation runs first, so logging never happens for
an invalid action.
*/


/* ======================================================
   MEMOIZATION TEST
====================================================== */

console.log("\n===== MEMOIZATION TEST =====");

const memoDispatch = withMemoization(
    fakeDispatch,
    action => action.type
);

memoDispatch({
    type: "ADD"
});

memoDispatch({
    type: "ADD"
});


/* ======================================================
   SINGLETON TEST
====================================================== */

console.log("\n===== SINGLETON TEST =====");

console.log(
    "Same store:",
    StoreModule.getStore() === store
);


/*
Trying to create another store throws.
*/

// Uncomment to test:
//
// StoreModule.createStore(
//     orderReducer,
//     initialOrderState
// );


/* ======================================================
   TIME TRAVEL - STRETCH
====================================================== */

const history = [];

store.subscribe(
    state => {
        history.push(state);
    }
);

decoratedDispatch(
    addAction({
        id: 5,
        name: "Monitor",
        price: 10000
    })
);

decoratedDispatch(
    discountAction(30)
);

console.log(
    "Snapshots saved:",
    history.length
);

/*
Time travel is cheap because pure reducers do not mutate
old states. Each snapshot can safely keep references to
unchanged branches.
*/


console.log("\n===== FINAL STATE =====");

console.log(
    store.getState()
);



/*Output :
Deep freeze: true
Nested freeze: true
Original city: Nellore
New city: Hyderabad
Cart reference shared: true
User reference changed: true
Pipe multiple arguments: 40
Pipe result: 9
Compose reverse result: 9
Pipe and reverse compose are equal: true
Debug value: 20
Tap result: 25
Action: { type: 'ADD', payload: { id: 1, name: 'Laptop', price: 50000 } }
Original dispatch name: dispatch
Decorated dispatch name: dispatch
Original dispatch length: 1
Decorated dispatch length: 1

===== ADD LAPTOP =====
[LOG] Dispatching: { type: 'ADD', payload: { id: 1, name: 'Laptop', price: 50000 } }
UI Cart: [ { id: 1, name: 'Laptop', price: 50000 } ]
UI Discount: 0
UI Total: 50000
Self-unsubscribing subscriber
Subscriber error: Intentional subscriber error
Subscriber dispatching another action...
ONE SHOT: ADD
WILDCARD EVENT: ADD
UI Cart: [ { id: 1, name: 'Laptop', price: 50000 } ]
UI Discount: 10
UI Total: 50000
Subscriber error: Intentional subscriber error
WILDCARD EVENT: DISCOUNT
[LOG] Finished: ADD
[TIMING] ADD: 5ms

===== ADD MOUSE =====
[LOG] Dispatching: { type: 'ADD', payload: { id: 2, name: 'Mouse', price: 1000 } }
UI Cart: [
  { id: 1, name: 'Laptop', price: 50000 },
  { id: 2, name: 'Mouse', price: 1000 }
]
UI Discount: 10
UI Total: 51000
Subscriber error: Intentional subscriber error
WILDCARD EVENT: ADD
[LOG] Finished: ADD
[TIMING] ADD: 1ms

===== DISCOUNT =====
[LOG] Dispatching: { type: 'DISCOUNT', payload: 20 }
UI Cart: [
  { id: 1, name: 'Laptop', price: 50000 },
  { id: 2, name: 'Mouse', price: 1000 }
]
UI Discount: 20
UI Total: 51000
Subscriber error: Intentional subscriber error
WILDCARD EVENT: DISCOUNT
[LOG] Finished: DISCOUNT
[TIMING] DISCOUNT: 2ms

===== REMOVE MOUSE =====
[LOG] Dispatching: { type: 'REMOVE', payload: 2 }
UI Cart: [ { id: 1, name: 'Laptop', price: 50000 } ]
UI Discount: 20
UI Total: 50000
Subscriber error: Intentional subscriber error
WILDCARD EVENT: REMOVE
[LOG] Finished: REMOVE
[TIMING] REMOVE: 2ms

===== ASSERTIONS =====
Assertion failed: cart should be shared
All assertions completed.

===== UNSUBSCRIBE TEST =====
[LOG] Dispatching: { type: 'ADD', payload: { id: 4, name: 'Keyboard', price: 2000 } }
UI Discount: 20
UI Total: 52000
Subscriber error: Intentional subscriber error
WILDCARD EVENT: ADD
[LOG] Finished: ADD
[TIMING] ADD: 2ms

===== DECORATOR ORDER TEST =====

Logging then validation:
Error: Action validation failed

Validation then logging:
[LOG] Dispatching: { type: 'INVALID' }
Error: Action validation failed

===== MEMOIZATION TEST =====
DISPATCH: ADD
[MEMO] Returning cached result

===== SINGLETON TEST =====
Same store: true
[LOG] Dispatching: { type: 'ADD', payload: { id: 5, name: 'Monitor', price: 10000 } }
UI Discount: 20
UI Total: 62000
Subscriber error: Intentional subscriber error
WILDCARD EVENT: ADD
[LOG] Finished: ADD
[TIMING] ADD: 1ms
[LOG] Dispatching: { type: 'DISCOUNT', payload: 30 }
UI Discount: 30
UI Total: 62000
Subscriber error: Intentional subscriber error
WILDCARD EVENT: DISCOUNT
[LOG] Finished: DISCOUNT
[TIMING] DISCOUNT: 1ms
Snapshots saved: 2

===== FINAL STATE =====
{ cart: { items: [ [Object], [Object], [Object] ] }, discount: 30 }
Async pipe result: 30
*/