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
    displayMenu()
    println("")
    displayCurrencyMenu()
}
//extension function to format Big Decimal values to specified decimal places
fun BigDecimal.formatDecimal(digits: Int): String = this.setScale(digits, RoundingMode.HALF_UP).toPlainString()

fun displayMenu() {
    val options = arrayOf("Register Account Name", "Deposit Amount", "Withdraw Amount", "Currency Exchange", "Record Exchange Rates", "Show Interest Computation", "Exit")
    println("Select Transaction:")
    for ((index, option) in options.withIndex()) {
        println("[${index + 1}] $option")
    }
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
    CNY("Chinese Yuan Renminni", "CNY")
}

//Account class with basic banking functionalities
class Account(val name: String, val baseCurrency: Currency = Currency.PHP) {
    private var balance = BigDecimal.ZERO

    fun deposit(amount: BigDecimal, currency: Currency) {
        // For simplicity, ignoring currency conversion
        if (amount > BigDecimal("0.00")) balance += amount else println("Deposit amount must be positive")
    }
    fun withdraw(amount: BigDecimal, currency: Currency) {
        // For simplicity, ignoring currency conversion
        if (amount > balance) println("Insufficient funds") else balance -= amount
    }
    fun calculateDailyInterest(numDays: Int, annualInterest: BigDecimal) {
        println("Day | Interest | Balance")
        for (day in 1..numDays) {
            val dailyInterest = (balance * (annualInterest / BigDecimal(365)))
            balance += dailyInterest
            println("$day | $dailyInterest | ${balance.formatDecimal(2)}")
        }
    }
    fun displayBalance() {
        println("Account Name: $name")
        println("Current Balance: ${balance.formatDecimal(2)}")
        println("Base Currency: ${baseCurrency.code}")
    }
}
//ConversionRate class to handle currency conversion
// SOURCE CURRENCY, BASE CURRENCY, EXCHANGE RATE
// Example : USD -> GBP will use USD->PHP and PHP->GBP since PHP is the base currency
data class ConversionRate(val source: Currency, val dest: Currency, var rate: Double) {
    fun calculateConversion(amount: Double): Double {
        return amount * rate
    }
}
