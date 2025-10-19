// Follow Java OOP conventions to simplify my life ffs

// Define Account class
export class account {
    accountName;
    balance;
    currency;

    // Constructor for new accounts
    constructor(accountName){
        this.accountName = accountName;
        this.balance = 0;
        this.currency = 'PHP';
    }

    // getters
    get getAccountName(){
        return this.accountName;
    }
    get getBalance(){
        return this.balance;
    }

    // methods
    deposit(amount){
        this.balance += amount;
    }
    withdraw(amount){
        this.balance -= amount;
    }
};


// Fixed exchange rates
export const exchangeRate = [1.00, 52.00, 0.47, 70.00, 58.00, 8.00]; // PHP to USD, JPY, GBP, EUR, CNY