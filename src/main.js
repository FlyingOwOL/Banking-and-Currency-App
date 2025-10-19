import promptSync from "prompt-sync";
export const prompt = promptSync();

import * as display from "./display_choices.js";
import * as controller from "./controllers.js";

let accounts;
let userChoice;
do{
    display.mainMenu();
    if (accounts != null){
        userChoice = Number(prompt("Enter your choice (1-7): "));
        switch(userChoice){
            case 1:
                console.log("Action denied. Account already registered. Go back to Main Menu.");
                break;
            case 2:
                controller.depositToAccount(accounts);
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
    } else {
        accounts = controller.registerAccount();
    }
} while(userChoice != 7);