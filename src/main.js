import promptSync from "prompt-sync";
const prompt = promptSync();

import * as display from "./display_choices.js";
import * as account from "./model.js";
import * as controller from "./controllers.js";



let accounts = [];

accounts.push(new account.account("John", "Doe", 200));
accounts.push(new account.account("Jane", "Smith"));
accounts.push(new account.account("Alice", "Johnson", 500));
let userChoice;
do{
    display.mainMenu();

    userChoice = Number(prompt("Enter your choice (1-7): "));
    switch(userChoice){
        case 1:
            const firstName = accounts[0].getFirstName;
            const lastName = accounts[0].getLastName;
            display.registerAccountName(lastName, firstName);
            display.backToMainMenu();
            break;
        case 2:
            
            break;
        case 3:

            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            console.log("Exiting program. Goodbye!");
            break;
        default:  
            console.log("Invalid choice. Please select a number from 1-7."); 
            break;
    }
} while(userChoice != 7);