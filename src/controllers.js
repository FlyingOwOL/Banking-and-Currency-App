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

function format(number, decimalPlaces){
    return number.toFixed(decimalPlaces);
}

export function depositOrWithdrawAmount(transactionType, accountName, amount, balance){
    console.log(
    `${transactionType} Amount 
    Account Name: ${accountName} 
    Current Balance: ${format(balance - amount, 2)} 
    Currency: PHP 
    
    ${transactionType} Amount: ${format(amount, 2)} 
    Updated Balance: ${format(balance, 2)} 
    
    Back to the Main Menu (Y/N):`);
}

export function depositToAccount(account){ //implicitly typed as a account object
    let amount = 0;
    do{
        try{
            amount = Number(prompt("Enter amount to deposit: "));
            if (amount > 0){
                account.deposit(amount);
                display.depositOrWithdrawAmount("Deposit", account.getAccountName, amount);
            } else {
                console.log("Amount must be greater than 0.");
            }
        }catch (error){
            console.log("An error occurred: " + error);
        }
    } while(isNaN(amount) || amount <= 0);
}

export function withdrawFromAccount(account){ //implicitly typed as a account object
    let amount = 0;
    do{
        try{
            amount = Number(prompt("Enter amount to withdraw: "));
            if (amount > 0 && amount <= account.getBalance){
                account.withdraw(amount);
                display.depositOrWithdrawAmount("Withdraw", account.getAccountName, amount);
            } else {
                console.log("Amount must be greater than 0 and less than or equal to current balance.");
            }
        }catch (error){
            console.log("An error occurred: " + error);
        }
    } while(isNaN(amount) || amount <= 0 || amount > account.getBalance);
}