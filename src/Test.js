import * as model from "./model.js";

let accounts = [];
accounts.push(new model.account("John", 200));
accounts.push(new model.account("Jane"));
accounts.push(new model.account("Doe", 500));

accounts[0].deposit(100);
accounts[1].deposit(200);
accounts[2].deposit(300); 
