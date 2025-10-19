import * as display from "./display_choices.js";
import * as model from "./model.js";
import { prompt } from "./main.js";

export function registerAccount(){
    let account;
    let userChoice;
    userChoice = Number(prompt("Enter your choice (1-7): "));
    if (userChoice == 1){
        console.log('Register Account Name');
        let accountName = prompt('Account Name:');
        account = new model.account(accountName);
        do{
            userChoice = prompt("Back to the Main Menu (Y/N): ");
            if (userChoice.toLowerCase() == 'n'){
                console.log("Account already registered. Go back to Main Menu.");
            }
        } while(userChoice.toLowerCase() != 'y');            
    } else {
        console.log("No account registered. Please register an account first.");
    }
    return account;
}

function format(number,   
                decimalPlaces){
    return number.toFixed(decimalPlaces);
}

function depositOrWithdrawAmount(transactionType, 
                                 accountName, 
                                 balance){
    console.log(
    `${transactionType} Amount 
Account Name: ${accountName} 
Current Balance: ${format(balance, 2)} 
Currency: PHP\n`);
}

export function depositToAccount(account){ 
    let amount = 0;
    let isDone = false;
    let userChoice;
    do{
        do{
            depositOrWithdrawAmount("Deposit", 
                                    account.getAccountName, 
                                    account.getBalance);
            try{
                amount = prompt("Deposit Amount: ");

                if (amount.includes('.') == false){
                    console.log("Amount must have a decimal.");
                } else if (parseFloat(amount) > 0){
                    account.deposit(parseFloat(amount));
                    console.log(`Updated Balance: ${format(account.getBalance, 2)}\n\n`);
                    isDone = true;
                } else {
                    console.log("Amount must be greater than 0.");
                }
            }catch (error){
                console.log("An error occurred: " + error);     
            }
        } while(!isDone);        
        userChoice = prompt("Back to the Main Menu (Y/N): ");
        isDone = false;
    } while(userChoice.toLowerCase() != 'y');
}

export function withdrawFromAccount(account){ //implicitly typed as a account object
    let amount = 0;
    let isDone = false;
    let userChoice;
    do{
        do{
            depositOrWithdrawAmount("Withdraw", 
                                    account.getAccountName, 
                                    account.getBalance);
            try{
                amount = prompt("Withdraw Amount: ");
                let parseAmount = parseFloat(amount);
                if (amount.includes('.') == false){
                    console.log("Amount must have a decimal.");
                } else if (parseAmount > 0 && parseAmount <= account.getBalance){
                    account.withdraw(parseAmount);
                    console.log(`Updated Balance: ${format(account.getBalance, 2)}\n\n`);
                    isDone = true;
                } else {
                    console.log("Amount must be greater than 0 and less than or equal to current balance.");
                }
            }catch (error){
                console.log("An error occurred: " + error);
            }
        } while(!isDone);
        userChoice = prompt("Back to the Main Menu (Y/N): ");
        isDone = false;

        if (account.getBalance == 0){ //force exit if balance is 0
            console.log("Balance is 0. Returning to Main Menu.");
            isDone = true;
        }
    }while(userChoice.toLowerCase() != 'y' && !isDone);
}

export function recordExchangeRates(){
    let num;
    let userChoice = 'n';
    do{
        display.recordExchangeRates();
        num = Number(prompt("Select Foreign Currency: "));
        if (num > 0 && num < 7){
            console.log(`Exchange Rate: ${format(parseFloat(model.exchangeRate[num - 1]), 2)}\n`);

            userChoice = prompt("Back to the Main Menu (Y/N): ");
        } else {
            console.log("Invalid choice. Please select a number from 1-6.");
        }
    } while(userChoice.toLowerCase() != 'y');
}

export function currencyExchange(){
    display.currencyExchange();
}