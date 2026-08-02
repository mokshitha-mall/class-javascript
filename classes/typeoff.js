console.log("\n=======Example.1 :typeof/instanceof quirks and checks========");
{
    console.log(typeof 42);         //'number
    console.log(typeof "hi");       //'string
    console.log(typeof undefined);  //'undefined'
    console.log(typeof null);      //'object' <- the famous quirk
    console.log(typeof []);        //'object' <- arrays too
    console.log(Array.isArray([])); //true - the real array check

    class ApiError extends Error{}
    const err = new ApiError("failed");
    console.log(err instanceof Error); //true
    console.log(err instanceof ApiError); //true
}


console.log("\n=======Example.2 :Safely narrowing an unkown API payload ========");
{
    function parseApiResult(data){
        if (data instanceof Error){
            throw data;
        }
        if (Array.isArray(data)){
            return data.map(parseApiResult);    //recurse into a list
        }
        if (data === null || typeof data !== "object") {
            return data; //primitive - nothing to unwrap
        }
        return{ ...data, receivedAt: new Date()}; 
    }
    console.log(parseApiResult(42));            //42 - premitive passes through
    console.log(parseApiResult([1,"two",null]));       //recurses into each item
    console.log(parseApiResult({id:1, name:"Moksha"})); //gets a receivedAt stamp
}