import * as display from "./display_choices.js";
import * as model from "./model.js";

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