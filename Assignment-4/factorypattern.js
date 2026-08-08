//CreditCard
class CreditCardPayment {

    pay(amount) {
        console.log(`Paid ₹${amount} using Credit Card`);
    }
}
//UPI
class UPIPayment {

    pay(amount) {
        console.log(`Paid ₹${amount} using UPI`);
    }
}
//Cash with pay(amount)
class CashPayment {

    pay(amount) {
        console.log(`Paid ₹${amount} using Cash`);
    }
}

class PaymentFactory {

    static createPayment(type) {

        switch (type.toLowerCase()) {

            case "creditcard":
                return new CreditCardPayment();

            case "upi":
                return new UPIPayment();

            case "cash":
                return new CashPayment();

            default:
                throw new Error("Invalid payment method");
        }
    }
}

// Testing

const payment1 = PaymentFactory.createPayment("creditcard");
payment1.pay(500);

const payment2 = PaymentFactory.createPayment("upi");
payment2.pay(300);

const payment3 = PaymentFactory.createPayment("cash");
payment3.pay(200);


/*Output:
Paid ₹500 using Credit Card
Paid ₹300 using UPI
Paid ₹200 using Cash
*/