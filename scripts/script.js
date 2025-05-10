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

const today = new Date();
console.log(today);

const day = today.getDate();
const month = today.getMonth() + 1; // Months are zero-based
const year = today.getFullYear();

form.addEventListener("submit", (e) => {
	console.log(`Day: ${inputDay.value}`);
	console.log(`Month: ${inputMonth.value}`);
	console.log(`Year: ${inputYear.value}`);

	validateDate();
	checkEmptyInput();

	e.preventDefault();
});

function calculateAge() {


  
}

function validateDate() {
	message = "Must be a valid";

	if (inputDay.value > 31 || inputDay.value < 1) {
		setError(inputDay, dayAlert, `${message} day`);
		clearInput(inputDay);
	}

	if (inputMonth.value > 12 || inputMonth.value < 1) {
		setError(inputMonth, monthAlert, `${message} month`);
		clearInput(inputMonth);
	}

	if (inputYear.value > year) {
		setError(inputYear, yearAlert, "Must be in the past");
		clearInput(inputYear);
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

function clearInput(e, value) {
	setTimeout(() => {
		e.value = "";
	}, timeOfExecutionMs);
}
