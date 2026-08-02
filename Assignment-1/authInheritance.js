class User {
  static totalUsers = 0;  // Static field
  constructor(username) {        // Constructor
    this.username = username;
    User.totalUsers++;
  }
  logout() {
    console.log(`${this.username} logged out`);
  }
}

class AdminUser extends User {
  #password;
  constructor(username, password) {
    super(username);          
    this.#password = password;
  }
  login(attempt) {              // Login method
    if (attempt === this.#password) {
      console.log("Access granted");
    } 
    else {
      console.log("Access denied");
    }
  }
  get hasPassword() {
    return this.#password? true:false;;
  }
  logout() {
    super.logout(); // Call the parent class method
    console.log("(admin session cleared)");
  }
}

class GuestUser extends User {
  constructor(username) {
    super(username); // Call the parent constructor
  }
  logout() {
    super.logout(); 
    console.log("(guest data discarded)");
  }
}

const admin = new AdminUser("neha", "s3cret");
const guest = new GuestUser("visitor1");

admin.login("wrong");   
admin.login("s3cret");  

const sessions = [admin, guest];
for (const user of sessions) {
  user.logout();
}

console.log(User.totalUsers);
console.log(admin.hasPassword);
