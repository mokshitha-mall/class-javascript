const BankAccount = (function () {

    // Private variable
    let balance = 0;

    //deposit()
    function deposit(amount) {
        balance += amount;
        console.log(`Deposited: ₹${amount}`);
    }

    //withdraw()
    function withdraw(amount) {
        if (amount > balance) {
            console.log("Insufficient balance");
            return;
        }

        balance -= amount;
        console.log(`Withdrawn: ₹${amount}`);
    }

    //getBalance()
    function getBalance() {
        return balance;
    }

    return {
        deposit,
        withdraw,
        getBalance
    };

})();

// Testing
BankAccount.deposit(5000);
BankAccount.withdraw(1000);

console.log("Current Balance:", BankAccount.getBalance());

/*Output:
Deposited: ₹5000
Withdrawn: ₹1000
Current Balance: 4000
*/
