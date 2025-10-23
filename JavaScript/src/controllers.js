import * as display from "./display_choices.js";
import * as model from "./model.js";
import { prompt } from "./main.js";

export function registerAccount(){
    let account;
    let userChoice;
    let accountName 
    
    console.log('Register Account Name');
    accountName = prompt('Account Name:');
    console.log('');
    account = new model.account(accountName);
    do{
        userChoice = prompt("Back to the Main Menu (Y/N): ");
        if (userChoice.toLowerCase() == 'n'){
            console.log("Account already registered. Go back to Main Menu.\n");
        }
    } while(userChoice.toLowerCase() != 'y'); 
    return account;
}

function format(number,   
                decimalPlaces,
                padding){
    const decimals = number.toFixed(decimalPlaces);
    return decimals.padStart(padding, ' ');
}

function depositOrWithdrawAmount(transactionType, 
                                 accountName, 
                                 balance){
    console.log(
    `${transactionType} Amount 
Account Name: ${accountName} 
Current Balance: ${format(balance, 2, 0)} 
Currency: PHP\n`);
}

export function depositToAccount(account){ 
    let amount = 0;
    let userChoice = 'n';
    do{
        depositOrWithdrawAmount("Deposit", 
                                account.getAccountName, 
                                account.balance);
    
        amount = prompt("Deposit Amount: ");

        if (!amount.includes('.')){
            console.log("Amount must have a decimal.\n");
            continue;
        } else if (amount <= 0){
            console.log("Amount must be greater than 0.\n");
            continue;
        }

        account.balance += parseFloat(amount);
        console.log(`Updated Balance: ${format(account.balance, 2, 0)}\n\n`);

        userChoice = prompt("Back to the Main Menu (Y/N): ");
    } while(userChoice.toLowerCase() != 'y');
}

export function withdrawFromAccount(account){ //implicitly typed as a account object
    let amount = 0;
    let userChoice = 'n';
    let parseAmount;
    do{
        depositOrWithdrawAmount("Withdraw", 
                                account.getAccountName, 
                                account.balance);

        amount = prompt("Withdraw Amount: ");
        parseAmount = parseFloat(amount);
        // if one of the conditions are met, skip current iteration
        if (!amount.includes('.')){
            console.log("Amount must have a decimal.\n");
            continue;
        } else if (parseAmount < 0){
            console.log("Amount must be greater than 0.\n");
            continue;
        } else if (parseAmount > account.balance){
            console.log("Amount must be less than the current balance.\n");
            continue;
        }

        account.balance -= parseAmount;
        console.log(`Updated Balance: ${format(account.balance, 2, 0)}\n\n`);

        userChoice = prompt("Back to the Main Menu (Y/N): ");
    }while(userChoice.toLowerCase() != 'y');
}

export function recordExchangeRates(currencyObject){
    let currency = null;
    let returnToMain = 'n';
    let stringRate = null;
    let isSuccessful = false;
    do{
        if(currency == null){
            display.recordExchangeRates();
            currency = Number(prompt("Select Foreign Currency: ")); 
        } 

        if (currency > 1 && currency < 7 && 
            stringRate == null){

            stringRate = prompt("Exchange Rate: ");
        } else if (currency < 1 || currency > 6){
            console.log("Invalid choice. Please select a number from 1-6.\n");
            currency = null;
            continue;
        }

        if (!stringRate.includes('.')){
            console.log("Exchange rate must have a decimal and be greater than or equal to 0.\n");
            stringRate = null;
            continue;
        } else if (parseFloat(stringRate) >= 0){
            currencyObject.exchangeRate[currency - 1] = parseFloat(stringRate); //set recorded rate
        } else{
            console.log("Exchange rate must be greater than 0.\n");
            stringRate = null;
            continue;
        }
   
        isSuccessful = true;     
        returnToMain = prompt("Back to the Main Menu (Y/N): ");

        if (isSuccessful && returnToMain.toLowerCase() != 'y'){
            currency = null; //reset currency selection
            stringRate = null; //reset exchange rate input
            isSuccessful = false;
        }
    } while(returnToMain.toLowerCase() != 'y');
}

export function currencyExchange(currencyObject){
    let repeat = 'y';
    let selectedCurrency = null;
    let sourceAmount = 0;
    let sourceRate = 0;
    let exchangedCurrency = null;
    let exchangedAmount = 0;
    let exchangedRate = 0;
    do{
        //check if at least 2 exchange rates are recorded if not, refuse user's rights to proceed
        if (currencyObject.exchangeRate.filter(rate => rate > 0).length < 2){ 
            console.log("Please record at least 2 exchange rates first.\n");
            break;
        }

        if (selectedCurrency == null){ //only prompt if no valid currency selected or reset
            display.sourceCurrencyDisplay();
            selectedCurrency = Number(prompt("Source Currency: "));
        }

        //invalidate selectedCurrency if conditions are met
        if (currencyObject.exchangeRate[selectedCurrency - 1] == 0){
            console.log("No exchange rate recorded for selected currency. " + 
                        "Please record exchange rate first.\n");
            selectedCurrency = null;
            continue;
        } else if (selectedCurrency < 1 || selectedCurrency > 6){ 
            console.log("Invalid choice. Please select a number from 1-6.\n");
            selectedCurrency = null;
            continue;
        }

        if (selectedCurrency > 0 && selectedCurrency < 7 &&
            sourceAmount == 0){

            sourceAmount = prompt("Source Amount: ");
            console.log('');
        }  

        //invalidate sourceAmount if conditions are met
        if (!sourceAmount.includes('.')){
            console.log("Amount must have a decimal.\n");
            sourceAmount = 0;
            continue;
        } else if (sourceAmount < 0){
            console.log("Amount must be greater than 0.\n");
            sourceAmount = 0;
            continue;
        }

        //only prompt if no valid exchanged currency selected or reset
        if (exchangedCurrency == null){ 
            display.sourceCurrencyDisplay();
            exchangedCurrency = prompt("Exchanged Currency: ");
        }

        //invalidate exchangedCurrency if conditions are met
        if (exchangedCurrency < 1 || exchangedCurrency > 6){ 
            console.log("Invalid choice. Please select a number from 1-6.\n");
            exchangedCurrency = null;
            continue;
        } else if (currencyObject.exchangeRate[exchangedCurrency - 1] == 0){
            console.log("No exchange rate recorded for selected currency. Please record exchange rate first.\n");
            exchangedCurrency = null;
            continue;
        } else if (exchangedCurrency == selectedCurrency){
            console.log("Exchanged currency cannot be the same as source currency.\n");
            
            repeat = prompt("Back to the Main menu(Y/N): ");
            if (repeat.toLowerCase() == 'y'){ //just leave bro
                break;
            }

            exchangedCurrency = null;
            continue;
        }

        sourceRate = currencyObject.exchangeRate[selectedCurrency - 1];
        exchangedRate = currencyObject.exchangeRate[exchangedCurrency - 1];

        exchangedAmount = (sourceAmount / exchangedRate) * sourceRate;
        console.log(`Exchanged Amount: ${format(exchangedAmount, 2, 0)}\n`);
         
        repeat = prompt("Convert another currency (Y/N)? . . . ");
        
        if (repeat.toLowerCase() == 'y'){

            selectedCurrency = null; //reset source currency selection
            sourceAmount = 0;
            exchangedCurrency = null; //reset exchanged currency selection
            exchangedAmount = 0;
        }
    } while(repeat.toLowerCase() == 'y');
}

export function showInterestComputation(account){
    let days = 0;
    let returnToMain = 'n';
    do{
        if(account.getBalance == 0){
            console.log("Balance currently empty. Deposit amount first\n");
            break;
        }
        
        display.interestAmount(account.getAccountName,
                               account.getBalance,
                               account.getCurrency,
                               account.annualInterestRate);
        console.log('');
        days = prompt("Total Number of Days: ");
        console.log('');
    
        //If at least one condition is met skip current iteration
        if(days.includes('.')){
            console.log("Number must not have any decimal\n");
            continue;
        } else if(days <= 0){
            console.log("Days must be more than 0\n");
            continue;
        }
        

        let interest = 0;
        let total = account.balance;
        console.log("Day | Interest | Balance |");
        for(let i = 0; i < days; i++){
            interest = computeInterest(total, account.annualInterestRate);
            total += interest;
            console.log(`${format(i+1, 0, 3)} | ${format(interest, 2, 0)}     |${format(total, 2, 8)} |`);
        }
        console.log('');

        returnToMain = prompt("Back to the Main Menu(Y/N): ");
    }while (returnToMain.toLowerCase() != 'y');
}

function computeInterest(balance, annualInterest){
    return balance * annualInterest / 365;
}