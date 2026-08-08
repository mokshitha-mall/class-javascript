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

// Inventory subscriber
eventBus.subscribe("orderPlaced", order => {
    console.log(
        `Inventory: Updating stock for Order ${order.id}`
    );
});

// Email subscriber
eventBus.subscribe("orderPlaced", order => {
    console.log(
        `Email: Sending confirmation for Order ${order.id}`
    );
});

// Analytics subscriber
eventBus.subscribe("orderPlaced", order => {
    console.log(
        `Analytics: Recording Order ${order.id}`
    );
});

// Publish event
eventBus.publish("orderPlaced", {
    id: 101,
    customer: "Mokshitha",
    amount: 450
});


/*Output:
Inventory: Updating stock for Order 101
Email: Sending confirmation for Order 101
Analytics: Recording Order 101
*/