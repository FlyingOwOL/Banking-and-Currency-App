/*
********************
Last names: Dela Torre, Espada, Laguerta, Sy
Language: Kotlin
Paradigm(s): Object-Oriented, Functional
********************
 */

import java.math.RoundingMode
import java.math.BigDecimal

fun main() {
    var account: Account? = null
    val conversionRates = mutableListOf(
        //base currency is PHP
        ConversionData(Currency.PHP, Currency.PHP, 1.00.toBigDecimal()),
        ConversionData(Currency.USD, Currency.PHP),
        ConversionData(Currency.JPY, Currency.PHP),
        ConversionData(Currency.GBP, Currency.PHP),
        ConversionData(Currency.EUR, Currency.PHP),
        ConversionData(Currency.CNY, Currency.PHP)
    )
    var userInput: Int
    do {
        displayMenu()
        print("Enter your choice (1-7): ")
        userInput = readln().toIntOrNull() ?: -1
        var willContinue: String
        when (userInput){
            1 -> {
                do {
                    println("--| Register Account Name |--")
                    if (account == null) account = createAccount()
                    else println("Account already exists.")
                    willContinue = askToProceedMainMenu()
                } while (willContinue == "N")
            }
            2 -> {
                do {
                    println("--| Deposit Amount |--")
                    if (account != null) {
                        account.displayBalance()
                        print("\nEnter amount to deposit: ")
                        val depositAmount = readln().toBigDecimalOrNull() ?: 0.00.toBigDecimal()
                        account.deposit(depositAmount)
                        println("Updated Balance: ${account.balance.formatDecimal(2)}")
                    }
                    else println("Account not found. Please register an account first.")
                    willContinue = askToProceedMainMenu()
                } while (willContinue == "N")
            }
            3 -> {
                do {
                    println("--| Withdraw Amount |--")
                    if (account != null) {
                        account.displayBalance()
                        print("\nEnter amount to withdraw: ")
                        val withdrawAmount = readln().toBigDecimalOrNull() ?: 0.00.toBigDecimal()
                        account.withdraw(withdrawAmount)
                        println("Updated Balance: ${account.balance.formatDecimal(2)}")
                    }
                    else println("Account not found. Please register an account first.")
                    willContinue = askToProceedMainMenu()
                } while (willContinue == "N")
            }
            4 -> {
                //make sure that the selected conversion rates are not zero
                do {
                    println("--| Currency Exchange |--")
                    println("Select Currency Option: ")
                    displayCurrencyMenu()
                    print("\nSelect Source Currency: ")
                    val selectedSourceConversion = conversionRates.getOrNull(askValidCurrency() - 1)
                    val sourceAmount = askValidAmount("Source amount: ")
                    println("Exchanged Currency Options: ")
                    displayCurrencyMenu()
                    val selectedDestConversion = conversionRates.getOrNull(askValidCurrency() - 1)
                    val destAmount = exchangeCurrencyValidation(selectedSourceConversion, selectedDestConversion, sourceAmount)
                    println("Exchanged Amount: ${destAmount.formatDecimal(2)}")
                    willContinue = askToProceedMainMenu()
                } while (willContinue == "N")
            }
            5 -> {
                do {
                    println("--| Record Exchange Rates |--")
                    displayCurrencyMenu()
                    print("\nSelect Foreign Currency: ")
                    val currencyChoice = askValidCurrency()
                    val selectedConversion = conversionRates.getOrNull(currencyChoice - 1)
                    setCurrencyRate(selectedConversion)
                    willContinue = askToProceedMainMenu()
                } while (willContinue == "N")
            }
            6 -> {
                do {
                    val annualInterest = 0.05.toBigDecimal() // 5% annual interest
                    println("--| Show Interest Computation |--")
                    if (account != null) {
                        account.displayBalance()
                        println("Interest Rate: ${(annualInterest * 100.toBigDecimal()).intValueExact()}%")
                        print("\nEnter number of days to compute interest: ")
                        val numDays = readln().toIntOrNull() ?: 0
                        if (numDays > 0) account.calculateDailyInterest(numDays, annualInterest) else println("Invalid number of days.")
                    }
                    else println("Account not found. Please register an account first.")
                    willContinue = askToProceedMainMenu()
                } while (willContinue == "N")
            }
            7 -> {
                println("Exiting the program. Thank you!")
            }
            else -> {
                println("Invalid input. Please enter a number between 1 and 7.\n")
            }
        }
    }while (userInput != 7)

}
//extension function to format Big Decimal values to specified decimal places
fun BigDecimal.formatDecimal(digits: Int): String = this.setScale(digits, RoundingMode.HALF_UP).toPlainString()

fun exchangeCurrencyValidation (selectedSourceConversion : ConversionData?, selectedDestConversion : ConversionData?, sourceAmount : BigDecimal) : BigDecimal {
    if (selectedSourceConversion == null || selectedDestConversion == null) {
        println("Invalid currency selection.")
        return 0.00.toBigDecimal()
    }
    if (selectedSourceConversion.rate == 0.00.toBigDecimal() || selectedDestConversion.rate == 0.00.toBigDecimal()) {
        println("One or both of the selected currency exchange rates are not set. Please record the exchange rates first.")
        return 0.00.toBigDecimal()
    } else {
        // SOURCE CURRENCY, BASE CURRENCY, EXCHANGE RATE
        // Example : USD -> GBP will use USD->PHP and PHP->GBP since PHP is the base currency
        val sourceCurrencyAmount = selectedSourceConversion.sourceToDestination(sourceAmount)
        return selectedDestConversion.destinationToSource(sourceCurrencyAmount)
    }

}

fun setCurrencyRate(selectedConversion: ConversionData?) : BigDecimal {
    var rate: BigDecimal
    if (selectedConversion != null) {
        print("Enter exchange rate for ${selectedConversion.source.code} to ${selectedConversion.dest.code}: ")
        rate = readln().toBigDecimalOrNull() ?: 0.00.toBigDecimal()
        // Validate input to ensure it's a positive decimal number and is not empty
        if (rate > 0.00.toBigDecimal()) {
            selectedConversion.rate = rate
        }
        else println("Invalid exchange rate.")
    } else {
        println("Invalid currency selection.")
        return 0.00.toBigDecimal()
    }
    return rate
}

fun askValidAmount(questionFormat : String) : BigDecimal {
    print(questionFormat)
    do {
        val amount = readln().toBigDecimalOrNull() ?: 0.00.toBigDecimal()
        if (amount > 0.00.toBigDecimal()) return amount
        else print("Invalid input. Please enter a positive amount: ")
    } while (true)
}

fun askValidCurrency() : Int {
    print("Select Currency (1-6): ")
    do {
        val currencyChoice = readln().toIntOrNull() ?: -1
        if (currencyChoice in 1..6) return currencyChoice
        else print("Invalid input. Please enter a number between 1 and 6: ")
    } while (true)
}

fun createAccount() : Account {
    print("Account Name (Leave blank for Default User): ")
    val name = readln().trim().ifEmpty {"Default User"}
    return Account(name)
}

fun askToProceedMainMenu() : String {
    print("Back to the Main Menu? (Y/N): ")
    do {
        val willContinue = readln().uppercase().trim()
        if (willContinue != "Y" && willContinue != "N") print("Invalid input. Please enter \"Y\" or \"N\": ")
        else return willContinue
    } while (true)
}

fun displayMenu() {
    val options = listOf("Register Account Name", "Deposit Amount", "Withdraw Amount", "Currency Exchange", "Record Exchange Rates", "Show Interest Computation", "Exit")
    println("Select Transaction:")
    for ((index, option) in options.withIndex()) {
        println("[${index + 1}] $option")
    }
    println("\n")
}

fun displayCurrencyMenu() {
    //display provided currencies from the enum class
    val currencies = Currency.entries.toTypedArray()
    for ((index, currency) in currencies.withIndex()) {
        println("[${index + 1}] ${currency.fullName} (${currency.code})")
    }
}

//enum class for supported currencies
enum class Currency(val fullName: String, val code: String) {
    PHP("Philippine Peso", "PHP"),
    USD("United States Dollar", "USD"),
    JPY("Japanese Yen", "JPY"),
    GBP("British Pound Sterling", "GBP"),
    EUR("Euro", "EUR"),
    CNY("Chinese Yuan Renminbi", "CNY")
}

//Account class with basic banking functionalities
class Account(val name: String, val baseCurrency: Currency = Currency.PHP) {
    var balance = 0.00.toBigDecimal()

    fun deposit(amount: BigDecimal) {
        // For simplicity, ignoring currency conversion
        if (amount > 0.00.toBigDecimal()) balance += amount else println("Deposit amount must be positive")
    }
    fun withdraw(amount: BigDecimal) {
        // For simplicity, ignoring currency conversion
        if (amount > balance) println("Insufficient funds")
        else if (amount < 0.00.toBigDecimal()) println("Withdrawal amount must be positive")
        else balance -= amount
    }
    fun calculateDailyInterest(numDays: Int, annualInterest: BigDecimal) {
        var balanceComputation = balance
        println("Day | Interest | Balance")
        for (day in 1..numDays) {
            val dailyInterest = balanceComputation * (annualInterest.divide(365.toBigDecimal(), 20, RoundingMode.HALF_UP))

            balanceComputation += dailyInterest
            println("$day | ${dailyInterest.formatDecimal(2)} | ${balanceComputation.formatDecimal(2)}")
        }
    }
    fun displayBalance() {
        println("Account Name: $name")
        println("Current Balance: ${balance.formatDecimal(2)}")
        println("Base Currency: ${baseCurrency.code}")
    }
}
//ConversionRate class to handle currency conversion
data class ConversionData(val source: Currency, val dest: Currency, var rate: BigDecimal = 0.00.toBigDecimal()) {
    fun destinationToSource(amount: BigDecimal): BigDecimal {
        return amount / rate
    }
    fun sourceToDestination(amount: BigDecimal): BigDecimal {
        return amount * rate
    }
}