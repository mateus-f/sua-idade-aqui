const form = document.querySelector("form"),
	inputDay = document.getElementById("input-day"),
	inputMonth = document.getElementById("input-month"),
	inputYear = document.getElementById("input-year"),
	submitButton = document.getElementById("submit-button"),
	timeOfExecutionMs = 2000;

let dayAlert = document.querySelector("#input-day + .alert"),
	monthAlert = document.querySelector("#input-month + .alert"),
	yearAlert = document.querySelector("#input-year + .alert"),
	outputYears = document.getElementById("output-years"),
	outputMonths = document.getElementById("output-months"),
	outputDays = document.getElementById("output-days"),
	message = "";

const today = new Date(),
	day = today.getDate(),
	month = today.getMonth() + 1,
	year = today.getFullYear();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	calculateElapsedTime();

	console.log(
		`day: ${inputDay.value}, month: ${inputMonth.value}, year: ${inputYear.value}`
	);
});

function calculateElapsedTime() {
	const dayValue = parseInt(inputDay.value, 10),
		monthValue = parseInt(inputMonth.value, 10) - 1,
		yearValue = parseInt(inputYear.value, 10),
		target = new Date(yearValue, monthValue, dayValue);

	let years = year - target.getFullYear(),
		months = today.getMonth() - target.getMonth(),
		days = today.getDate() - target.getDate();

	if (dayValue === "" || monthValue === "" || yearValue === "") {
		checkEmptyInput();
		return;
	}

	if (days < 0) {
		const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
		days += prevMonth.getDate();
		months--;
	}

	if (months < 0) {
		months += 12;
		years--;
	}

	outputYears.innerText = years;
	outputMonths.innerText = months;
	outputDays.innerText = days;
}

function validateDate() {
	message = "Must be a valid";

	if (inputDay.value > 31 || inputDay.value < 1) {
		setError(inputDay, dayAlert, `${message} day`);
		clearValue(inputDay);
	}

	if (inputMonth.value > 12 || inputMonth.value < 1) {
		setError(inputMonth, monthAlert, `${message} month`);
		clearValue(inputMonth);
	}

	if (inputYear.value > year) {
		setError(inputYear, yearAlert, "Must be in the past");
		clearValue(inputYear);
	}

	if (inputYear.value < 0) {
		setError(inputYear, yearAlert, `${message} year`);
		clearValue(inputYear);
	}
}

function checkEmptyInput() {
	message = "This field is required";

	if (inputDay.value === "") {
		setError(inputDay, dayAlert, message);
	}

	if (inputMonth.value === "") {
		setError(inputMonth, monthAlert, message);
	}

	if (inputYear.value === "") {
		setError(inputYear, yearAlert, message);
	} else {
		validateDate();
	}
}

function setError(input, alert, message) {
	input.previousElementSibling.classList.add("error");
	input.classList.add("error");
	alert.innerHTML = message;

	setTimeout(() => {
		input.previousElementSibling.classList.remove("error");
		input.classList.remove("error");
		alert.innerHTML = "";
	}, timeOfExecutionMs);
}

function clearValue(e, value) {
	setTimeout(() => {
		e.value = "";
	}, timeOfExecutionMs);
}
