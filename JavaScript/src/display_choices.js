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
function sourceCurrencyDisplay(){
    const sourceCurrency =
    `Foreign Currency Exchange
    Source Currency Option:
    ${displayCurrencies()}`;
    return sourceCurrency
}

export function currencyExchange(){
    console.log(
`${sourceCurrencyDisplay()}

Source Currency: [2] 
Source Amount: 100.00

Exchanged Currency Options:
    ${displayCurrencies()}
    
Exchanged Currency: [1]
Exchanged Amount: 5200.00

Convert another currency (Y/N)?: `);
}

export function interestAmount(accountName, balance, currency, interestRate, totalDays){
    console.log(
    `Show Interest Amount 
    Account Name: ${accountName} 
    Current Balance: ${balance} 
    Currency: ${currency} 
    Interest Rate: ${interestRate}% 

    Total Number of Days: ${totalDays}
    
    Back to the Main Menu (Y/N): `);
}