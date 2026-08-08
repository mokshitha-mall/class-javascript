// =====================================================
// LIBRARY MANAGEMENT SYSTEM
// =====================================================



// =====================================================
// 1. PURE FUNCTIONS & IMMUTABILITY
// =====================================================

// Definition:
// Pure functions always return the same output for the
// same input and never modify the original object.


// Add a new book
function addBook(library, book) {

    return {
        ...library,
        books: [...library.books, book]
    };
}


// Remove a book
function removeBook(library, id) {

    return {
        ...library,
        books: library.books.filter(book => book.id !== id)
    };
}


// Borrow a book
function borrowBook(library, id) {

    return {
        ...library,

        books: library.books.map(book =>

            book.id === id
                ? { ...book, available: false }
                : book
        )
    };
}



// =====================================================
// 2. FUNCTION COMPOSITION
// =====================================================

// Definition:
// Function Composition combines multiple small
// functions into one function.

function pipe(...functions) {

    return function(value){

        return functions.reduce(
            (result, fn) => fn(result),
            value
        );

    };

}


// Remove extra spaces
const trim = title => title.trim();

// Convert to lowercase
const lowercase = title => title.toLowerCase();

// Capitalize first letter
const capitalize = title =>
title.charAt(0).toUpperCase() + title.slice(1);


// Process title
const processTitle = pipe(

    trim,
    lowercase,
    capitalize

);



// =====================================================
// 3. MODULE PATTERN
// =====================================================

// Definition:
// Module Pattern hides private data and exposes
// only required methods.

const LibrarySettings = (function(){

    // Private variable
    let maxBooks = 5;

    return{

        getLimit(){

            return maxBooks;

        }

    };

})();



// =====================================================
// 4. SINGLETON PATTERN
// =====================================================

// Definition:
// Singleton Pattern ensures only one Logger object
// exists throughout the application.

class Logger{

    constructor(){

        if(Logger.instance){

            return Logger.instance;

        }

        Logger.instance = this;

    }

    log(message){

        console.log(`[LOG] ${message}`);

    }

    static getInstance(){

        if(!Logger.instance){

            Logger.instance = new Logger();

        }

        return Logger.instance;

    }

}

const logger = Logger.getInstance();



// =====================================================
// 5. OBSERVER / PUB-SUB
// =====================================================

// Definition:
// Observer Pattern notifies multiple subscribers
// whenever an event occurs.

class EventBus{

    constructor(){

        this.events = {};

    }


    subscribe(eventName, callback){

        if(!this.events[eventName]){

            this.events[eventName] = [];

        }

        this.events[eventName].push(callback);

    }


    publish(eventName, data){

        if(!this.events[eventName]){

            return;

        }

        this.events[eventName].forEach(callback=>{

            callback(data);

        });

    }

}

const eventBus = new EventBus();


// Inventory Notification
eventBus.subscribe("bookBorrowed", book=>{

    console.log(`Inventory : "${book.title}" marked unavailable`);

});


// Email Notification
eventBus.subscribe("bookBorrowed", book=>{

    console.log(`Email : Borrow confirmation sent`);

});


// Analytics Notification
eventBus.subscribe("bookBorrowed", book=>{

    console.log(`Analytics : Borrow recorded`);

});



// =====================================================
// 6. FACTORY PATTERN
// =====================================================

// Definition:
// Factory Pattern creates objects based on user input.

class Student{

    borrowLimit(){

        return 3;

    }

}


class Teacher{

    borrowLimit(){

        return 5;

    }

}


class MemberFactory{

    static createMember(type){

        switch(type.toLowerCase()){

            case "student":

                return new Student();

            case "teacher":

                return new Teacher();

            default:

                throw new Error("Invalid Member");

        }

    }

}



// =====================================================
// 7. DECORATOR PATTERN
// =====================================================

// Definition:
// Decorator Pattern adds extra functionality
// without changing the original function.

function withExecutionTime(fn){

    return function(...args){

        const start = performance.now();

        const result = fn(...args);

        const end = performance.now();

        console.log(
            `Execution Time : ${(end-start).toFixed(2)} ms`
        );

        return result;

    };

}



// =====================================================
// MAIN LIBRARY FUNCTION
// =====================================================

// Borrow a book

function borrowBookFromLibrary(library,id){

    logger.log("Borrowing Book...");

    const updatedLibrary = borrowBook(library,id);

    const book = updatedLibrary.books.find(book=>book.id===id);

    eventBus.publish("bookBorrowed",book);

    return updatedLibrary;

}



// =====================================================
// TEST
// =====================================================

console.log("========== LIBRARY MANAGEMENT SYSTEM ==========");


// Empty Library
let library = {

    books: []

};


// Add Books

library = addBook(library,{

    id:1,
    title:processTitle("   JAVASCRIPT   "),
    author:"Moksha",
    available:true

});


library = addBook(library,{

    id:2,
    title:processTitle("   PYTHON   "),
    author:"Tabu",
    available:true

});


console.log("Library");

console.log(library);


// Module Pattern

console.log(
    "Maximum Books Allowed :",
    LibrarySettings.getLimit()
);


// Factory Pattern

const student =
MemberFactory.createMember("student");

console.log(
    "Student Borrow Limit :",
    student.borrowLimit()
);


// Decorator Pattern

const borrow =
withExecutionTime(borrowBookFromLibrary);


library = borrow(library,1);


console.log("Updated Library");

console.log(library);

/*Output:
========== LIBRARY MANAGEMENT SYSTEM ==========
Library
{
  books: [
    { id: 1, title: 'Javascript', author: 'Moksha', available: true },
    { id: 2, title: 'Python', author: 'Tabu', available: true }
  ]
}
Maximum Books Allowed : 5
Student Borrow Limit : 3
[LOG] Borrowing Book...
Inventory : "Javascript" marked unavailable
Email : Borrow confirmation sent
Analytics : Borrow recorded
Execution Time : 1.49 ms
Updated Library
{
  books: [
    { id: 1, title: 'Javascript', author: 'Moksha', available: false },
    { id: 2, title: 'Python', author: 'Tabu', available: true }
  ]
}
*/

