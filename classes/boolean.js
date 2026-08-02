{
    const dbEmployeeId = 101;              //Number from db
    const apiEmployeeId ="101";            //String from API
    console.log(dbEmployeeId == apiEmployeeId); //true
    console.log(dbEmployeeId === apiEmployeeId); //false
    //Best Practice
    console.log(Number(apiEmployeeId) === dbEmployeeId); //true
}
console.log("\n=======Example.4 : Student marks Validation========");
{
    function validateMarks(marks) {
        if(!marks){
            return "Marks are required";
        }
        return "Marks accepted";
    }
    function validateMarksFixed(marks){
        if(marks === undefined || marks === null){
            return "Marks are required";
        }
        return "Marks accepted";
    }
    console.log(validateMarks(0)); //wrong
    console.log(validateMarksFixed(0)); //correct
}

console.log("\n=======Example.6 : Login validation========");
{
    function login(username){
        if(!username){
            return "Username is required";
        }
        return`welcome ${username}`;
    }
    console.log(login("")); 
    console.log(login("Moksha"));
}