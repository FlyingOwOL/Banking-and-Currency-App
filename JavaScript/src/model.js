/*
********************
Last names: Dela Torre, Espada, Laguerta, Sy
Language: JavaScript
Paradigm(s): Object-Oriented, Functional, Procedural
********************
 */

// Follow Java OOP conventions to simplify my life ffs

// Define Account class
export class account {
    accountName;
    balance;
    currency;
    annualInterestRate; //The woll of wof strit yeh?

    // Constructor for new accounts
    constructor(accountName){
        this.accountName = accountName;
        this.balance = 0;
        this.currency = 'PHP';
        this.annualInterestRate = 0.05; // 5% default annual interest rate fixed
    }

    // getters
    get getAccountName(){
        return this.accountName;
    }
    get getBalance(){
        return this.balance;
    }
    get getCurrency(){
        return this.currency;
    }
    get annualInterestRate(){
        return this.annualInterestRate;
    }
};


// Define Currency class
export class currency {
    exchangeRate; 
    countryCode;

    constructor(){
        this.exchangeRate = [1, 0, 0, 0, 0, 0]; // PHP to [PHP, USD, JPY, GBP, EUR, CNY]
        this.countryCode = ['PHP', 'USD', 'JPY', 'GBP', 'EUR', 'CNY'];
    }
};