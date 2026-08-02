class Account {
    constructor(username) {
        this.username = username;
        this._failedAttempts = 0;
        this._isLoggedIn = false;
    }

    //setter
    set failedAttempts(value) {
        if (value < 0) {
            console.log("Failed attempts cannot be negative");
            return;
        }

        this._failedAttempts = value;
    }
    
    //getter
    get status() {
        if (this._failedAttempts >= 3) 
            {
            return "Locked";
        }
        if (this._isLoggedIn) {
            return "Logged in";
        }
        return "Logged out";
    }

    login(password, correctPassword) {
    if (this._failedAttempts >= 3) {
            console.log("Account locked");     //check already locked
            return;
    }
    if (password !== correctPassword) {
        this._failedAttempts++;
            console.log("Incorrect password");    //wrong password
            if (this._failedAttempts >= 3) {
                console.log("Account locked");
            }
            return;
    }
    this._isLoggedIn = true;
    this._failedAttempts = 0;
    console.log("Login successful");
}
}

const account = new Account("neha");
//console.log(account);

account.login("222", "abc123");
console.log(account.status);
account.login("111", "abc133");
console.log(account.status);
account.login("123", "abc123");
//account.failedAttempts = -1;   
//account.failedAttempts = 2;
//console.log(account);
console.log(account.status);
console.log(account.status);
