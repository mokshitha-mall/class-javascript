//step-1 : create your own error
class AgeError extends Error {}
//step 2: function
function checkAge(age) {
    if (age < 18) {
        throw new AgeError("Age must be 18 or above");
    }
    console.group("you can vote");
}
//step 3:call the function
try {
    checkAge(17); 
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("Program finshed");
}
