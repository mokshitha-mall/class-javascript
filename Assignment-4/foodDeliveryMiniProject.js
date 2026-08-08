// =====================================
// 1. PURE FUNCTIONS
// =====================================

function addItem(cart, item) {

    return {
        ...cart,
        items: [...cart.items, item]
    };
}

function updateQuantity(cart, itemId, quantity) {

    return {
        ...cart,
        items: cart.items.map(item =>
            item.id === itemId
                ? { ...item, quantity }
                : item
        )
    };
}

function calculateTotal(cart) {

    return cart.items.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
}


// =====================================
// 2. FUNCTION COMPOSITION
// =====================================

function pipe(...functions) {

    return function (value) {

        return functions.reduce(
            (result, fn) => fn(result),
            value
        );
    };
}

const trim = name => name.trim();

const lowercase = name => name.toLowerCase();

const capitalize = name =>
    name.charAt(0).toUpperCase() + name.slice(1);

const addAvailableStatus = name => ({
    name,
    status: "Available"
});

const processFood = pipe(
    trim,
    lowercase,
    capitalize,
    addAvailableStatus
);


// =====================================
// 3. SINGLETON LOGGER
// =====================================

class Logger {

    constructor() {

        if (Logger.instance) {
            return Logger.instance;
        }

        Logger.instance = this;
    }

    log(message) {
        console.log(`[LOG] ${message}`);
    }

    static getInstance() {

        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
}

const logger = Logger.getInstance();


// =====================================
// 4. OBSERVER / EVENT BUS
// =====================================

class EventBus {

    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    publish(eventName, data) {

        if (!this.events[eventName]) {
            return;
        }

        this.events[eventName].forEach(callback => {
            callback(data);
        });
    }
}

const eventBus = new EventBus();

eventBus.subscribe("orderPlaced", order => {

    console.log(
        `Inventory: Stock updated for Order ${order.id}`
    );

});

eventBus.subscribe("orderPlaced", order => {

    console.log(
        `Email: Confirmation sent for Order ${order.id}`
    );

});

eventBus.subscribe("orderPlaced", order => {

    console.log(
        `Analytics: Order ${order.id} recorded`
    );

});


// =====================================
// 5. FACTORY
// =====================================

class CreditCardPayment {

    pay(amount) {
        console.log(`Payment: ₹${amount} paid by Credit Card`);
    }
}

class UPIPayment {

    pay(amount) {
        console.log(`Payment: ₹${amount} paid using UPI`);
    }
}

class CashPayment {

    pay(amount) {
        console.log(`Payment: ₹${amount} paid using Cash`);
    }
}

class PaymentFactory {

    static createPayment(type) {

        switch (type.toLowerCase()) {

            case "creditcard":
                return new CreditCardPayment();

            case "upi":
                return new UPIPayment();

            case "cash":
                return new CashPayment();

            default:
                throw new Error("Invalid payment type");
        }
    }
}


// =====================================
// 6. DECORATOR
// =====================================

function withExecutionTime(fn) {

    return function (...args) {

        const start = performance.now();

        const result = fn(...args);

        const end = performance.now();

        console.log(
            `Execution Time: ${(end - start).toFixed(2)} ms`
        );

        return result;
    };
}


// =====================================
// 7. FOOD DELIVERY ORDER
// =====================================

function placeOrder(cart, paymentType) {

    logger.log("Placing order...");

    const total = calculateTotal(cart);

    console.log(`Order Total: ₹${total}`);

    const payment =
        PaymentFactory.createPayment(paymentType);

    payment.pay(total);

    const order = {
        id: Math.floor(Math.random() * 1000),
        items: cart.items,
        total: total,
        status: "Placed"
    };

    eventBus.publish("orderPlaced", order);

    return order;
}


// =====================================
// TEST
// =====================================

console.log("===== FOOD DELIVERY SYSTEM =====");

const pizza = processFood("   PIZZA   ");

console.log("Food:", pizza);

let cart = {
    items: []
};

cart = addItem(cart, {
    id: 1,
    name: pizza.name,
    quantity: 2,
    price: 250
});

cart = addItem(cart, {
    id: 2,
    name: "Burger",
    quantity: 1,
    price: 150
});

console.log("Cart:", cart);

const fastOrder = withExecutionTime(placeOrder);

const order = fastOrder(cart, "UPI");

console.log("Final Order:", order);


/*Output :
===== FOOD DELIVERY SYSTEM =====
Food: { name: 'Pizza', status: 'Available' }
Cart: {
  items: [
    { id: 1, name: 'Pizza', quantity: 2, price: 250 },
    { id: 2, name: 'Burger', quantity: 1, price: 150 }
  ]
}
[LOG] Placing order...
Order Total: ₹650
Payment: ₹650 paid using UPI
Inventory: Stock updated for Order 352
Email: Confirmation sent for Order 352
Analytics: Order 352 recorded
Execution Time: 1.88 ms
Final Order: {
  id: 352,
  items: [
    { id: 1, name: 'Pizza', quantity: 2, price: 250 },
    { id: 2, name: 'Burger', quantity: 1, price: 150 }
  ],
  total: 650,
  status: 'Placed'
}
*/
