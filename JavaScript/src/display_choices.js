/*
********************
Last names: Dela Torre, Espada, Laguerta, Sy
Language: JavaScript
Paradigm(s): Object-Oriented, Functional, Procedural
********************
 */

export function spacing(){
    console.log("\n\n\n");
}

export function mainMenu(){
    console.log(
    `Select Transaction: 
[1] Register Account Name 
[2] Deposit Amount 
[3] Withdraw Amount 
[4] Currency Exchange 
[5] Record Exchange Rates 
[6] Show Interest Computation
[7] Exit Program`);
}

/**
 * Used to display the currency choices
 * @returns {string} currency choices to polarize in logger
 */
function displayCurrencies(){
    const currencyChoices =
    `[1] Philippine Peso (PHP) 
[2] United States Dollar (USD) 
[3] Japanese Yen (JPY) 
[4] British Pound Sterling (GBP) 
[5] Euro (EUR) 
[6] Chinese Yuan Renminni (CNY)`;
    return currencyChoices;
}

export function recordExchangeRates(){
    console.log(
    `Record Exchange Rate

${displayCurrencies()}\n`);
} 
 
/**
 * Used on the first half of the currency exchange display
 * @returns {string} source currency display to polarize in logger
 */
export function sourceCurrencyDisplay(){
    console.log(
    `Foreign Currency Exchange\nSource Currency Option:\n${displayCurrencies()}\n`);
}

export function interestAmount(accountName, balance, currency, interestRate){
    console.log(
    `Show Interest Amount 
Account Name: ${accountName} 
Current Balance: ${balance} 
Currency: ${currency} 
Interest Rate: ${interestRate * 100}%`);
}