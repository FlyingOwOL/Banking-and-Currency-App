# FOREX as of Oct 7, 2025 00:15H
# Gathered from https://www.oanda.com/currency-converter/en
CURRENCIES<-c("PHP", "USD", "JPY", "GBP", "EUR", "CNY")
PHP_RATIOS<-c(1.00000,	0.01725,	2.54734,	0.01280,	0.01469,	0.12278)
USD_RATIOS<-c(57.8234,	1.00000,	147.70200,	0.74190,	0.85171,	7.11900)
JPY_RATIOS<-c(0.39142,	0.00677,	1.00000,	0.00502,	0.00577,	0.04819)
GBP_RATIOS<-c(77.8872,	1.34698,	198.97200,	1.00000,	1.14733,	9.58918)
EUR_RATIOS<-c(67.8778,	1.17388,	173.384,	0.87101,	1.00000,	8.35686)
CNY_RATIOS<-c(8.12127,	0.14045,	20.7447,	0.10420,	0.11962,	1.00000)

# For reading inputs
prompter <- function(placeholder) {
	if (interactive()) {
		readline(placeholder)
	} else {
		cat(placeholder)
		readLines("stdin",n=1)
	}
}

# For sending outputs
printer <- function(msg) { if (interactive()) print(msg) else cat(msg) }

currency_converter <- function(amount,from,to) {
	target_from<-switch(from,
		PHP_RATIOS,
		USD_RATIOS,
		JPY_RATIOS,
		GBP_RATIOS,
		EUR_RATIOS,
		CNY_RATIOS
	)
	return(target_from[to] * amount)
}

# Currency conversion
state1 <- function() {
	digit_from<-0
	digit_to<-0
	# Prompt user-desired conversion
	while (digit_from<1 || digit_from>6 || digit_to<1 || digit_to>6 || digit_from==digit_to) {
		prompt_ret<-as.numeric(prompter(paste(sep="",
			"\n",
			"Enter a two-digit number with each digit corresponding to the choices below.\n",
			"Note that you cannot enter same digits, e.g. 11, 22, 33, ...\n",
			"1) Philippine Peso (PHP)\n",
			"2) United States Dollar (USD)\n",
			"3) Japanese Yen (JPY)\n",
			"4) British Pound (GBP)\n",
			"5) Euro (EUR)\n",
			"6) Chinese Yuan Renminbi (CNY)\n",
			"7) Return to menu",
			"\n",
			">>>"
		)))
		if (!is.na(prompt_ret)) {
			digit_from<-prompt_ret%/%10
			digit_to<-prompt_ret%%10
		}
		if (digit_from==7 || digit_to==7)
			return(0)
	}
	from_amount<-NA
	# Prompt amount user wants to convert
	while (is.na(from_amount)) {
		from_amount<-as.numeric(prompter(paste(sep="",
			"\nEnter the amount of ",CURRENCIES[digit_from]," to convert to ",CURRENCIES[digit_to],": "
		)))
	}
	# Print results
	printer(paste(sep="",
		from_amount," ",CURRENCIES[digit_from]," is equivalent to ",
		currency_converter(from_amount, digit_from, digit_to)," ",CURRENCIES[digit_to],"."
	))
	# Console pause
	prompter("\nPress ENTER to continue...")
	return(1)
}

# Balance
state2 <- function() {
	
}

# Forecast interest
state3 <- function() {
	
}

# Withdraw
state4 <- function() {
	
}

# Deposit
state5 <- function() {
	
}

# Screen state transferer
runState <- function(state=0) {
	if (state==0) {
		prompt_ret<-prompter(paste(sep="",
			"\n",
			"Enter a transaction of your choice:\n",
			"1) Currency conversion\n",
			"2) Balance\n",
			"3) Forecast interest\n",
			"4) Withdraw\n",
			"5) Deposit\n",
			"6) Exit\n",
			"\n",
			">>>"
		))
		if (prompt_ret>0 && prompt_ret<=5)
			return(prompt_ret)
		else if (prompt_ret==6)
			return(-1)
		else
			return(0)
	} else {
		return(switch(as.numeric(state),
			state1(),
			state2(),
			state3(),
			state4(),
			state5()
		))
	}
}

main <- function() {
	state<-0;
	while (state!=-1)
		state<-runState(state)
}

main()
