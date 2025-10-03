use std::io::{self, Write};

#[derive(PartialEq, Copy, Clone)]
pub enum Currency {
    PHP,
    USD,
    JPY,
    GBP,
    EUR,
    CNY
}

pub struct CurrencyInfo {
    pub currency: Currency,
    pub balance: f64,
    pub exchange_rate_from_php: f64,
    pub exchange_rate_to_php: f64,
    pub has_rate: bool
}


fn input_number() -> u32 {
    loop {
        let mut input:String = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read");

        match input.trim().parse::<u32>() {
            Ok(num) => return num,
            Err(_) => println!("Please enter a valid number."),
        }
    }
}

fn enter_currency() -> Currency {
    loop {
        print!("Enter currency [PHP, USD, JPY, GBP, EUR, CNY]: ");
        io::stdout().flush().unwrap(); // prompt appears first 

        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read");
        match input.trim().to_lowercase().as_str() {
            "php" => return Currency::PHP,
            "usd" => return Currency::USD,
            "jpy" => return Currency::JPY,
            "gbp" => return Currency::GBP,
            "eur" => return Currency::EUR,
            "cny" => return Currency::CNY,
            _ => println!("Invalid input! Please enter a valid currency."),
        }
    }
}

fn find_currency_balance(currency_info: &mut [CurrencyInfo], currency: Currency) -> &mut f64 {
    for i in currency_info.iter_mut() {
        if i.currency == currency {
            return &mut i.balance;
        }
    }
    panic!("Currency not found");
}

fn register_account_name() -> String{
    let mut name = String::new();
    println!("Enter your account name:");
    io::stdin().read_line(&mut name).expect("Failed to read");
    println!("Account Name: {} has been registered", name.trim());
    name.trim().to_string()
}

fn daily_interest_calculation(balance: f64) -> f64 {
    let annual_interest: f64 = 0.05; // 5% annual interest
    balance * (annual_interest / 365.0)
}

fn compute_interest(day: u32, balance: f64) {
    let mut daily_balance = balance;

    println!("Day\t|Interest\t|Balance");
    for i in 0..day {
        let interest = daily_interest_calculation(daily_balance);
        let day_number:u32 = i + 1;
        daily_balance += interest;
        println!("{day_number}\t|{interest:.2}\t|{daily_balance:.2}");
    }
}

fn deposit(balance: &mut f64 , amount: f64) {
    *balance += amount;
    println!("Deposited: {amount:.2}");
    println!("New Balance: {balance:.2}");
}

fn withdraw(balance: &mut f64, amount: f64) {
    if *balance >= amount {
        println!("Withdrew: {amount:.2}");
        *balance -= amount;
    } else {
        println!("Insufficient funds for withdrawal of {amount:.2}");
    }
    println!("New Balance: {balance:.2}");
}

fn exchange_currency(balance: f64, rate: f64) -> f64 {
    balance * rate
}

fn display_menu() {
    println!("-----Bank Application-----");
    println!("[1] Register Account Name");
    println!("[2] Deposit");
    println!("[3] Withdraw");
    println!("[4] Currency Exchange");
    println!("[5] Record Exchange Rates");
    println!("[6] Compute Interest");
    println!("[7] Exit");
}

fn display_currency_menu() {
    println!("Select Currency:");
    println!("[1] PHP");
    println!("[2] USD");
    println!("[3] JPY");
    println!("[4] GBP");
    println!("[5] EUR");
    println!("[6] CNY");
}

pub fn run() {
    let mut has_account: bool = false;
    let mut currency: Currency;
    let mut _amount: f64;
    let mut _balance: &mut f64;
    let _exchange_rate: &mut f64;
    let mut currency_info: [CurrencyInfo; 6] = [
        CurrencyInfo { currency: Currency::PHP, balance: 0.0 , exchange_rate_from_php: 0.0, exchange_rate_to_php: 0.0, has_rate: false},
        CurrencyInfo { currency: Currency::USD, balance: 0.0 , exchange_rate_from_php: 0.0, exchange_rate_to_php: 0.0, has_rate: false},
        CurrencyInfo { currency: Currency::JPY, balance: 0.0 , exchange_rate_from_php: 0.0, exchange_rate_to_php: 0.0, has_rate: false},
        CurrencyInfo { currency: Currency::GBP, balance: 0.0 , exchange_rate_from_php: 0.0, exchange_rate_to_php: 0.0, has_rate: false},
        CurrencyInfo { currency: Currency::EUR, balance: 0.0 , exchange_rate_from_php: 0.0, exchange_rate_to_php: 0.0, has_rate: false},
        CurrencyInfo { currency: Currency::CNY, balance: 0.0 , exchange_rate_from_php: 0.0, exchange_rate_to_php: 0.0, has_rate: false},
    ];


    loop {
        display_menu(); 
        let choice: u32 = input_number();

        match choice {
            1 => {
                if !has_account {
                    println!("-----Register Account Name-----");
                    register_account_name();
                    has_account = true;

                    loop {
                        println!("Back to the Main Menu[Y/N]?");
                        let mut input = String::new();
                        io::stdin().read_line(&mut input).expect("Failed to read");
                        match input.trim().to_lowercase().as_str() {
                            "y" => break, // Exit the loop to return to main; menu
                            "n" => println!("Account already registered."),
                            _ => println!("Invalid input! Please enter Y or N."),
                        }
                    }   
                } else {
                    println!("Account already registered.");
                }
            },
            2 => {
                if has_account {
                    loop {
                        println!("-----Deposit-----");
                        currency = enter_currency();
                        _balance = find_currency_balance(&mut currency_info, currency);
                        print!("Enter amount to deposit: ");
                        io::stdout().flush().unwrap(); // prompt appears first
                        _amount = input_number() as f64;
                        
                        deposit(_balance, _amount);

                        println!("Back to the Main Menu[Y/N]?");
                        let mut input = String::new();
                        io::stdin().read_line(&mut input).expect("Failed to read");
                        match input.trim().to_lowercase().as_str() {
                            "y" => break, // Exit the loop to return to main menu
                            "n" => println!("Continuing Transaction..."),
                            _ => println!("Invalid input! Please enter Y or N."),
                        }
                    }          
                } else {
                    println!("Please register an account first.");
                }
            },
         3 => {
                if has_account {
                    loop {
                        println!("-----Withdraw-----");
                        currency = enter_currency();
                        _balance = find_currency_balance(&mut currency_info, currency);
                        print!("Enter amount to withdraw: ");
                        io::stdout().flush().unwrap(); // prompt appears first
                        _amount = input_number() as f64;      
            
                        withdraw(_balance, _amount);

                        println!("Back to the Main Menu[Y/N]?");
                        let mut input = String::new();
                        io::stdin().read_line(&mut input).expect("Failed to read");
                        match input.trim().to_lowercase().as_str() {
                            "y" => break, // Exit the loop to return to main menu
                            "n" => println!("Continuing Transaction..."),
                            _ => println!("Invalid input! Please enter Y or N."),
                        }
                    }          
                } else {
                    println!("Please register an account first.");
                }
            },
            4 => {
                loop {
                    println!("-----Currency Exchange-----");

                    let mut source: u32;

                    loop {
                        println!("Source Currency Options");
                        display_currency_menu();
                        print!("Source Currency: ");
                        io::stdout().flush().unwrap(); // prompt appears first
                        source = input_number();

                        if (source >= 1) && (source <= 6) {
                            break;
                        } else {
                            println!("Invalid choice! Please select a valid option.");
                        }
                    }

                    print!("Source Amount: ");
                    io::stdout().flush().unwrap(); // prompt appears first
                    let source_amount: f64 = input_number() as f64;

                    let mut exchange: u32;

                    loop {
                        println!("Exchange Currency Options");
                        display_currency_menu();
                        print!("Exchange Currency: ");
                        io::stdout().flush().unwrap(); // prompt appears first
                        exchange = input_number();

                        if (exchange >= 1) && (exchange <= 6) {
                            if exchange == source {
                                println!("Source and exchange currencies cannot be the same.");
                                continue; // prompt again if same currency
                            }
                            else if (!currency_info[source as usize - 1].has_rate) || (!currency_info[exchange as usize - 1].has_rate) {
                                println!("Please record exchange rates for the selected currencies first.");
                                continue; // prompt again if no exchange rate
                            }
                            else {
                                let source_currency = &currency_info[source as usize - 1];
                                let exchange_currency_info = &currency_info[exchange as usize - 1];

                                if source_currency.currency == Currency::PHP {
                                    let exchange_amount = exchange_currency(source_amount, exchange_currency_info.exchange_rate_from_php); 
                                    println!("Exchanged Amount: {:.2}", exchange_amount); 
                                }
                                else if exchange_currency_info.currency == Currency::PHP {
                                    let exchange_amount = exchange_currency(source_amount, source_currency.exchange_rate_to_php);
                                    println!("Exchanged Amount: {:.2}", exchange_amount);
                                }
                                else {
                                    let php_amount = exchange_currency(source_amount, source_currency.exchange_rate_to_php);
                                    let exchange_amount = exchange_currency(php_amount, exchange_currency_info.exchange_rate_from_php);
                                    println!("Exchanged Amount: {:.2}", exchange_amount);
                                }
                            }
                            break;
                        } else {
                            println!("Invalid choice! Please select a valid option.");
                        }
                    }
                    

                    println!("Back to the Main Menu[Y/N]?");
                    let mut input = String::new();
                    io::stdin().read_line(&mut input).expect("Failed to read");
                    match input.trim().to_lowercase().as_str() {
                        "y" => break, // Exit the loop to return to main menu
                        "n" => println!("Continuing Transaction..."),
                        _ => println!("Invalid input! Please enter Y or N."),
                    }
                }

            },
            5 => {
                loop {
                    println!("-----Record Exchange Rates-----");
                    display_currency_menu();

                    let choice: u32 = input_number();
                    match choice {
                        1 => currency = Currency::PHP,
                        2 => currency = Currency::USD,
                        3 => currency = Currency::JPY,
                        4 => currency = Currency::GBP,
                        5 => currency = Currency::EUR,
                        6 => currency = Currency::CNY,
                        _ => {
                            println!("Invalid choice! Please select a valid option.");
                            continue; // Prompt again if invalid choice
                        }
                    }

                    for i in currency_info.iter_mut() {
                        if i.currency == currency {
                            i.exchange_rate_to_php = input_number() as f64;
                            i.exchange_rate_from_php = 1.0 / i.exchange_rate_to_php;
                            i.has_rate = true;
                            break;
                        }
                    }

                    println!("Back to the Main Menu[Y/N]?");
                    let mut input = String::new();
                    io::stdin().read_line(&mut input).expect("Failed to read");
                    match input.trim().to_lowercase().as_str() {
                        "y" => break, // Exit the loop to return to main menu
                        "n" => println!("Continuing Transaction..."),
                        _ => println!("Invalid input! Please enter Y or N."),
                    }
                }
            },
            6 => {
                if has_account {
                    loop {
                        println!("-----Compute Interest-----");
                        print!("Enter number of days to compute interest for: ");
                        io::stdout().flush().unwrap(); // prompt appears first
                        let days: u32 = input_number();

                        currency = enter_currency();
                        _balance = find_currency_balance(&mut currency_info, currency);

                        compute_interest(days, *_balance);

                        println!("Back to the Main Menu[Y/N]?");
                        let mut input = String::new();
                        io::stdin().read_line(&mut input).expect("Failed to read");
                        match input.trim().to_lowercase().as_str() {
                            "y" => break, // Exit the loop to return to main menu
                            "n" => println!("Continuing Transaction..."),
                            _ => println!("Invalid input! Please enter Y or N."),
                        }
                    }
                }
                else {
                    println!("Please register an account first.");
                }
            },
            7 => {
                println!("Exitting the program...");
                break;          },
            _ => println!("Invalid choice! Please select a valid option."),
        }
    }
}