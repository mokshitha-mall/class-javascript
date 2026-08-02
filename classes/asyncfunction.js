function fetchUser(){
    return new Promise((resolve, reject) => {
        console.log("Fatching user ....");
        setTimeout(() => {
            reject(new Error("Server is down"));
        }, 2000);
    });
}
//async function
async function getUser(){
    try {
        console.log("Inside try block");
        const user = await fetchUser();
        console.log("User :", user);
    } catch (error) {
        console.log("Inside catch block");
        console.log("Error :", error.message);
    }finally  {
        console.log('Inside finally block');
        console.log("Request finished");
    }
}
console.log("Program Started");
getUser();