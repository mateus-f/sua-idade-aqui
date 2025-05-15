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

const today = new Date(),
	timeOfExecutionMs = 2000;

let message = "";

form.addEventListener("submit", (e) => {
	e.preventDefault(); 
	checkEmptyInput()
});

function checkEmptyInput() {
	message = "This field is required";

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
	let isValid = true; 
	message = "Must be  valid";

	if (inputDay.value > 31 || inputDay.value < 1) {
		setError(inputDay, dayAlert, `${message} day`);
		isValid = false;
	}

	if (inputMonth.value > 12 || inputMonth.value < 1) {
		setError(inputMonth, monthAlert, `${message} month`);
		isValid = false;
	}

	if (inputYear.value > today.getFullYear()) {
		setError(inputYear, yearAlert, "Must be in the past");
		isValid = false;
	}

	if (inputYear.value < 0) {
		setError(inputYear, yearAlert, `${message} year`);
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
		target = new Date(yearValue, monthValue, dayValue); 
	
let years = today.getFullYear() - target.getFullYear(),
		months = today.getMonth() - target.getMonth(),
		days = today.getDate() - target.getDate();

	
if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue)) {
		checkEmptyInput();
		return;
	}

	setOutput(years, months, days);
}

function setOutput(year, month, day) {
	
if (day < 0) {
		const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
		day += prevMonth.getDate();
		month--;
	}

	
if (month < 0) {
		month += 12;
		year--;
	}

	
outputYears.innerText = year;
	outputMonths.innerText = month;
	outputDays.innerText = day;
}

function setError(input, alert, message) {
	input.previousElementSibling.classList.add("error");
	input.classList.add("error");
	alert.innerText = message;

	
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
