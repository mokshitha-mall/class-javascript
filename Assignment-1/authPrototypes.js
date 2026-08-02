const sessionHandler = {
  role: "guest",
  login: function () {
    return `${this.username} logged in as ${this.role}`;
  },
  logout: function () {
    return `${this.username} logged out`;
  }
};

const user1 = Object.create(sessionHandler);
user1.username = "arjun";

const user2 = Object.create(sessionHandler);
user2.username = "sara";
user2.role = "admin";

console.log(user1.login());  // arjun logged in as guest
console.log(user2.login());  // sara logged in as admin

sessionHandler.role = "member";
// Call login() again
console.log(user1.login()); // arjun logged in as member
console.log(user2.login()); // sara logged in as admin

// Log user1's own properties
console.log(Object.keys(user1));

// Log the prototype's own properties
console.log(
  Object.getOwnPropertyNames(
    Object.getPrototypeOf(user1))
);