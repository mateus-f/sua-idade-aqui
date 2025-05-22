// Captch all the HTML elements
const form = document.querySelector("form"),
	inputDay = document.getElementById("input-day"),
	inputMonth = document.getElementById("input-month"),
	inputYear = document.getElementById("input-year"),
	dayAlert = document.querySelector("#input-day + .alert"),
	monthAlert = document.querySelector("#input-month + .alert"),
	yearAlert = document.querySelector("#input-year + .alert"),
	outputYears = document.getElementById("output-years"),
	outputMonths = document.getElementById("output-months"),
	outputDays = document.getElementById("output-days");

// Fixed values
const today = new Date(),
	timeOfExecutionMs = 2000;

// Manipulable values
let message = "";

form.addEventListener("submit", (e) => {
	e.preventDefault(); // Cancel the default form submission
	checkEmptyInput();
});

function checkEmptyInput() {
	message = "O campo é obrigatório";

	if (!inputDay.value) {
		setError(inputDay, dayAlert, message);
		clearOutput();
	}
	if (!inputMonth.value) {
		setError(inputMonth, monthAlert, message);
		clearOutput();
	}
	if (!inputYear.value) {
		setError(inputYear, yearAlert, message);
		clearOutput();
	} else {
		validateDate();
	}
}

function validateDate() {
	let isValid = true; // Using the flag-basead validation
	message = "Deve ser um";

	if (inputDay.value > 31 || inputDay.value < 1) {
		setError(inputDay, dayAlert, `${message} dia válido`);
		isValid = false;
	}

	if (inputMonth.value > 12 || inputMonth.value < 1) {
		setError(inputMonth, monthAlert, `${message} mês válido`);
		isValid = false;
	}

	if (inputYear.value > today.getFullYear()) {
		setError(inputYear, yearAlert, "Deve ser no passado");
		isValid = false;
	}

	if (inputYear.value < 0) {
		setError(inputYear, yearAlert, `${message} ano válido`);
		isValid = false;
	}

	if (!isValid) {
		clearOutput();
		return;
	}

	calculateElapsedTime();
}

function calculateElapsedTime() {
	const dayValue = parseInt(inputDay.value, 10),
		monthValue = parseInt(inputMonth.value, 10) - 1,
		yearValue = parseInt(inputYear.value, 10),
		target = new Date(yearValue, monthValue, dayValue); // Create a date object with the input values

	// The difference between the two dates
	let years = today.getFullYear() - yearValue,
		months = today.getMonth() - target.getMonth(),
		days = today.getDate() - target.getDate();

	// Routing to the necessary function
	if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue)) {
		checkEmptyInput();
		return;
	}

	setOutput(years, months, days);
}

function setOutput(year, month, day) {
	// If the day is negative, we need to borrow days from the previous month
	if (day < 0) {
		const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
		day += prevMonth.getDate();
		month--;
	}

	// If the month is negative, we need to borrow months from the previous year
	if (month < 0) {
		month += 12;
		year--;
	}

	// Setting the output values
	outputYears.innerText = year;
	outputMonths.innerText = month;
	outputDays.innerText = day;
}

function setError(input, alert, message) {
	input.previousElementSibling.classList.add("error");
	input.classList.add("error");
	alert.innerText = message;

	// Remove the error message after a certain time
	setTimeout(() => {
		input.previousElementSibling.classList.remove("error");
		input.classList.remove("error");
		alert.innerText = "";
	}, timeOfExecutionMs);
}

function clearOutput() {
	outputDays.innerText = "--";
	outputMonths.innerText = "--";
	outputYears.innerText = "--";
}
