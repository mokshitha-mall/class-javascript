console.log("\n=====single User object=====");
console.log("Use when you need one object,right now.\n");
{
    const Single =  { Username:"arjun", password:"pass123" };
    console.log(Single);
}


console.log("\n====factor function ======");
console.log("Use when you need many objects, build the simple way\n");
{
   function createUser(username, password)
    {
        return {
            username,
            login(input)         //compares it with the correct password
            {
                return input === password;
            }
        };
    }
   const userType = [
        ["neha", "abc123"],
        ["ravi", "qwerty"],
        ["sara", "hunter2"],
    ];
   const allUsers=userType.map(([username,password])=> createUser(username,password));
   console.log(allUsers);

}
//Use when you need to create many similar objects without using the new keyword.


console.log("\n====3.construction function ======");
console.log("Use when you need many objects, build the new\n");
{
   function User(username, password) 
   {
        this.username = username;
        this.password = password;
    }
    User.prototype.login = function(input) 
    {
        return input === this.password;
    };
   const userData = [
        ["neha", "abc123"],
        ["ravi", "qwerty"],
        ["sara", "hunter2"]
    ];
    const allUsers=userData.map(([username,password]) => new User(username,password));
    console.log(allUsers);
    const user1 = allUsers[0];
    console.log(Object.getPrototypeOf(user1) === User.prototype);
}
//Use when you need to create many objects using 'new' and share methods through the prototype


console.log("\n====4.ES6 class ======");
console.log("Use when same as constructor function, but clear syntax.\n");
{
    class User 
    {
        constructor(username, password) 
        {
            this.username = username;
            this.password = password;
        }
        static isValidUsername(name) 
        {
            return name.length >= 4;
        }
    }
    const userData = [
        ["neha", "abc123"],
        ["ravi", "qwerty"],
        ["sara", "hunter2"]
    ];
    const allUsers = userData.map(([username, password]) => new User(username, password));
    console.log(allUsers);
    console.log(User.isValidUsername("neha"));
    console.log(User.isValidUsername("rajesh"));
    console.log(User.isValidUsername("sara"));
}
//Use when you want cleaner, modern syntax for creating objects
//Factory function: Each object gets its own separate copy of the login() method because the method is created every time the factory function is called
//Constructor function and ES6 class: All objects share one copy of the login() method through the prototype, which saves memory



console.log("\nTrying to call class without 'new':");

try 
{
    User("test", "1234");   // Calling class like a normal function
}
catch (error) 
{
    console.log(error.message);   // Class constructor User cannot be without 'new'
}

