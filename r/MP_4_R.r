# Currency
CURRENCIES<-c("PHP","USD","JPY","GBP","EUR","CNY")
CURRENCY_RATES<-array(0.0,dim=c(length(CURRENCIES),length(CURRENCIES)))

# user
ACCOUNT_NAME<-NULL
ACCOUNT_BALANCE<-100.0
ACCOUNT_CURRENCY<-CURRENCIES[1]

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

# For prompting user about which currency
currency_selector <- function(header_text) {
	prompt_ret<-NA
	while (is.na(prompt_ret)||prompt_ret>length(CURRENCIES)||prompt_ret<1) {
		prompt_ret<-as.numeric(prompter(paste(sep="",
			"\n",header_text,"\n",
			"[1] Philippine Peso (PHP)\n",
			"[2] United States Dollar (USD)\n",
			"[3] Japanese Yen (JPY)\n",
			"[4] British Pound (GBP)\n",
			"[5] Euro (EUR)\n",
			"[6] Chinese Yuan Renminbi (CNY)\n",
			"[7] Return to menu\n",
			"\n>>>"
		)))
		if (prompt_ret==7)
			return(0)
	}
	return(prompt_ret)
}

currency_converter <- function(amount,from,to) {
	if (CURRENCY_RATES[from,to]==0.0)
		return(NA)
	else
		return(CURRENCY_RATES[from,to]*amount)
}

show_account_status <- function() {
	printer(paste(sep="",
		"Account name: ",ACCOUNT_NAME,"\n",
		"Balance: ",ACCOUNT_BALANCE,"\n",
		"Currency: ",ACCOUNT_CURRENCY,"\n"
	))
}

# Register Account Name
state1 <- function() {
	# Reset and prompt for new account Name
	ACCOUNT_NAME<<-NULL
	while (is.null(ACCOUNT_NAME)) {
		ACCOUNT_NAME<<-prompter("Set a valid account name: ")
	}
	printer(paste(sep="","Account name has been set to '",ACCOUNT_NAME,"'.\n"))
	# Console pause
	prompter("\nPress ENTER to return to main menu...")
	return(0)
}

# Deposit Amount
state2 <- function() {
	show_account_status()
	# Prompt for amount
	last_balance<-ACCOUNT_BALANCE
	deposit<-NA
	while (is.na(deposit)||deposit<=0.0) {
		deposit<-as.numeric(prompter(paste(sep="",
			"\n",
			"Specify deposit amount: "
		)))
	}
	# Add to balance and inform
	ACCOUNT_BALANCE<<-ACCOUNT_BALANCE+deposit
	printer(paste(sep="",
		"\n",
		"The balance of ",ACCOUNT_NAME," has been updated from ",
		last_balance," to ",ACCOUNT_BALANCE," ",ACCOUNT_CURRENCY,
		" by depositing ",deposit," ",ACCOUNT_CURRENCY,".\n"
	))
	# Console pause
	prompter("\nPress ENTER to return to main menu...")
	return(0)
}

# Withdraw Amount
state3 <- function() {
	show_account_status()
	# Prompt for amount
	last_balance<-ACCOUNT_BALANCE
	withdraw<-NA
	while (is.na(withdraw)||withdraw<=0.0||withdraw>last_balance) {
		withdraw<-as.numeric(prompter(paste(sep="",
			"\n",
			"Specify withdraw amount: "
		)))
	}
	# Subtract from balance and inform
	ACCOUNT_BALANCE<<-ACCOUNT_BALANCE-withdraw
	printer(paste(sep="",
		"\n",
		withdraw," ",ACCOUNT_CURRENCY," has been taken from ",ACCOUNT_NAME,".\n",
		"The updated balance is now from ",last_balance," to ",ACCOUNT_BALANCE," ",ACCOUNT_CURRENCY,".\n"
	))
	# Console pause
	prompter("\nPress ENTER to return to main menu...")
	return(0)
}

# Currency Exchange
state4 <- function() {
	# Prompt user-desired conversion
	digit_from<-currency_selector("Choose what currency to convert from:")
	if (digit_from==0)
		return(digit_from)
	
	digit_to<-digit_from
	while (digit_to==digit_from) {
		digit_to<-currency_selector(paste(sep="",
			"Choose what currency to convert to, except for ",
			digit_from,") ",CURRENCIES[digit_from],":"
		))
		if (digit_to==0)
			return(digit_to)
	}
	
	# Check if there is a conversion record
	if (is.na(currency_converter(1,digit_from,digit_to))) {
		printer(paste(sep="",
			"There is no conversion rate assigned for ",
			CURRENCIES[digit_from]," to ",CURRENCIES[digit_to]," yet.\n",
			"Please assign a conversion rate on the Record Exchange Rates menu."
		))
		prompter("\nPress ENTER to return to main menu...")
		return(0)
	}
	
	# Prompt amount user wants to convert
	from_amount<-NA
	printer(paste(sep="",
		"The current rate from ",CURRENCIES[digit_from]," to ",CURRENCIES[digit_to],
		" is ",CURRENCY_RATES[digit_from,digit_to],".\n"
	))
	while (is.na(from_amount)) {
		from_amount<-as.numeric(prompter(paste(sep="",
			"\nEnter the amount of ",CURRENCIES[digit_from],
			" to convert to ",CURRENCIES[digit_to],": "
		)))
	}
	
	# Print results
	printer(paste(sep="",
		from_amount," ",CURRENCIES[digit_from]," is equivalent to ",
		currency_converter(from_amount,digit_from,digit_to)," ",CURRENCIES[digit_to],".\n"
	))
	
	# Console pause
	prompter("\nPress ENTER to make another currency exchange...")
	return(4)
}

# Record Exchange Rates
state5 <- function() {
	# Prompt user-desired conversion
	digit_from<-currency_selector("Choose what currency to convert from:")
	if (digit_from==0)
		return(digit_from)
	
	digit_to<-digit_from
	while (digit_to==digit_from) {
		digit_to<-currency_selector(paste(sep="",
			"Choose what currency to convert to, except for ",
			digit_from,") ",CURRENCIES[digit_from],":"
		))
		if (digit_to==0)
			return(digit_to)
	}
	
	# Assign rate
	rate<-NA
	if (CURRENCY_RATES[digit_from,digit_to]!=0)
		printer(paste(sep="",
			"The current rate from ",CURRENCIES[digit_from]," to ",CURRENCIES[digit_to],
			" is ",CURRENCY_RATES[digit_from,digit_to],".\n"
		))
	while (is.na(rate)||rate<=0.0) {
		rate<-as.numeric(prompter(paste(sep="",
			"Assign a ",ifelse(CURRENCY_RATES[digit_from,digit_to]==0.0,"new rate","rate")," from ",
			CURRENCIES[digit_from]," to ",CURRENCIES[digit_to],": "
		)))
	}
	
	# Change rates to and back, then print completion.
	CURRENCY_RATES[digit_from,digit_to]<<-rate
	CURRENCY_RATES[digit_to,digit_from]<<-rate^(-1)
	printer(paste(sep="",
		"Currency exchange for ",CURRENCIES[digit_from]," and ",CURRENCIES[digit_to],
		" has been updated.\n"
	))
	
	# Console pause
	prompter("\nPress ENTER to make another record...")
	return(5)
}

# Show Interest Computation
state6 <- function() {
	return(0)
}

# Screen state transferer
runState <- function(state=0) {
	if (state==0) {
		prompt_ret<-as.numeric(prompter(paste(sep="",
			"\n",
			"Select transaction:\n",
			"[1] Register Account Name\n",
			"[2] Deposit Amount\n",
			"[3] Withdraw Amount\n",
			"[4] Currency Exchange\n",
			"[5] Record Exchange Rates\n",
			"[6] Show Interest Computation\n",
			"[7] Exit\n",
			"\n>>>"
		)))
		
		if (prompt_ret>=1&&prompt_ret<=6)
			return(prompt_ret)
		else if (prompt_ret==7)
			return(-1)
		else
			return(0)
	} else {
		return(switch(as.numeric(state),
			state1(),
			state2(),
			state3(),
			state4(),
			state5(),
			state6()
		))
	}
}

main <- function() {
	state<-0;
	while (state!=-1) {
		if (is.null(ACCOUNT_NAME))
			state<-state1()
		else
			state<-runState(state)
	}
}

main()
