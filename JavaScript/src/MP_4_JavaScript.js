/*
********************
Last names: Dela Torre, Espada, Laguerta, Sy
Language: JavaScript
Paradigm(s): Object-Oriented, Functional, Procedural
********************
 */

import promptSync from "prompt-sync";
export const prompt = promptSync();

import * as display from "./display_choices.js";
import * as controller from "./controllers.js";
import * as model from "./model.js";

let accounts;
const currency = new model.currency();
let userChoice;
do{
    display.mainMenu();

    userChoice = Number(prompt("Enter your choice (1-7): "));
    if (accounts == null && userChoice == 1){
        display.spacing(); 
        accounts = controller.registerAccount();
        display.spacing();
        continue;
    } else if (accounts == null && 
               (userChoice == 2 ||  //can't deposit
                userChoice == 3 ||  //can't withdraw
                userChoice == 6)){  //can't show interest

        console.log("No account registered. Please register an account first.\n");
        continue;
    }
    switch(userChoice){
        case 1:
            display.spacing();
            console.log("Action denied. Account already registered. Go back to Main Menu.\n");
            display.spacing();
            break;
        case 2:
            display.spacing();
            controller.depositToAccount(accounts);
            display.spacing();
            break;
        case 3:
            display.spacing();
            controller.withdrawFromAccount(accounts);
            display.spacing();
            break;
        case 4:
            display.spacing();
            controller.currencyExchange(currency);
            display.spacing();
            break;
        case 5:
            display.spacing();
            controller.recordExchangeRates(currency);
            display.spacing();
            break;
        case 6:
            display.spacing();
            controller.showInterestComputation(accounts);
            display.spacing();
            break;
        case 7:
            display.spacing();
            console.log("Exiting program. Goodbye!");
            display.spacing();
            break;
        default:  
            display.spacing();
            console.log("Invalid choice. Please select a number from 1-7.\n"); 
            display.spacing();
            break;
    }
} while(userChoice != 7);