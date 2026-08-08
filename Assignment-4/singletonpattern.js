// Logger Singleton
class Logger {

    static instance = null;

    constructor() {

        // Prevent creating multiple objects directly
        if (Logger.instance) {
            return Logger.instance;
        }

        console.log("Logger object created");

        // Store the current object as the single instance
        Logger.instance = this;
    }

    // Method to get the single Logger instance
    static getInstance() {

        // Create the object only if it does not already exist
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        // Always return the same object
        return Logger.instance;
    }

    // Logger method
    log(message) {
        console.log("LOG:", message);
    }
}


const logger1 = Logger.getInstance();

const logger2 = Logger.getInstance();

// Display log messages
logger1.log("First log message");
logger2.log("Second log message");

// Verify both variables refer to the same object
console.log(logger1 === logger2);



/*Output:
Logger object created
LOG: First log message
LOG: Second log message
true
*/


