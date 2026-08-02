//Global Error Handler
process.on("uncaughtException", (error) => {
    console.log("Pizza Manager :", error.message);
    console.log("Don't worry we'll make another pizza");
});
function makePizza(){
    console.log("Chef is makig a pizza......");
    //oops! something went wrong
    throw new Error("Pizza is burned");
}
console.log("Customer placed an order.");
makePizza();
console.log("Pizza delivered.");