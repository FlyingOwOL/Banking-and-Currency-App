// Follow Java OOP conventions to simplify my life ffs

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