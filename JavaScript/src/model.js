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


// Define Currency class
export class currency {
    exchangeRate; 
    countryCode;

    constructor(){
        this.exchangeRate = [0, 0, 0, 0, 0, 0]; // PHP to [PHP, USD, JPY, GBP, EUR, CNY]
        this.countryCode = ['PHP', 'USD', 'JPY', 'GBP', 'EUR', 'CNY'];
    }
};