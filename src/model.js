// Follow Java OOP conventions to simplify my life ffs

export class account {
    firstName;
    lastName;
    accountName;
    balance;

    // Constructor for new accounts
    constructor(lastName, firstName, amount = 0){
        this.accountName = lastName + ", " + firstName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = amount;
    }

    // getters
    get getAccountName(){
        return this.accountName;
    }
    get getBalance(){
        return this.balance;
    }
    get getFirstName(){
        return this.firstName;
    }
    get getLastName(){
        return this.lastName;
    }

    // methods
    deposit(amount){
        this.balance += amount;
    }
    withdraw(amount){
        this.balance -= amount;
    }
};