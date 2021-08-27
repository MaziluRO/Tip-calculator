const btns = document.querySelectorAll('.tip-btn');
const billInput = document.querySelector('#bill-input');
const inputNumber = document.querySelector('#tip-input');
const calcBtns = document.querySelector('.calc-buttons');
const resetBtn = document.querySelector('#reset-btn');
const peopleInput = document.querySelector('#people-input');
const errMsg = document.querySelector('#error-msg');

//Tip display
const tipAmount = document.querySelector('#tip-amount');
const totalAmount = document.querySelector('#total-amount');

let tip = 0;
let bill = 0;
let tipPercentage = 0;
let numberPeople = 1;
let calcTip = false;
let canReset = false;

/****** */

//functions

//clears buttons of active class
const clearBtns = function () {
	btns.forEach((btn) => btn.classList.remove('active'));
};

//displays tip per person on first row
const calcTipPerPerson = function (numberPersons = 1) {
	const calcTipAmount = (bill * tipPercentage) / 100;
	const tipPerPerson = (calcTipAmount / numberPersons).toFixed(2);

	tipAmount.innerText = `$${tipPerPerson}`;
};

//displays total bill with tip per person on second row
const calcTotalTipPerPerson = function (numberPersons) {
	console.log(
		'bill= ',
		bill,
		'numberPersons= ',
		numberPersons,
		'tipPercentage= ',
		tipPercentage
	);
	const calcTipAmount = (
		((bill * tipPercentage) / 100 + bill) /
		numberPersons
	).toFixed(2);
	totalAmount.innerText = `$${calcTipAmount}`;
};

const resetCalcInputs = function () {
	peopleInput.value = '';
	billInput.value = '';
	inputNumber.value = '';
	resetDisplayTips();
};

const resetDisplayTips = function () {
	tipAmount.innerText = '$0.00';
	totalAmount.innerText = '$0.00';
};

const disableResetButton = function () {
	canReset = false;
	resetBtn.classList.add('disabled');
};

const enableResetButton = function () {
	canReset = true;
	resetBtn.classList.remove('disabled');
};

//checks if the input is empty
const isInputEmpty = function (varInput) {
	if (!varInput.value || Number.isNaN(varInput.value)) {
		resetDisplayTips();

		return true;
	}
	enableResetButton();
	return false;
};

/********
 * *******
 * *******
 */

//inputs with event listeners
billInput.addEventListener('input', function () {
	let isEmpty = isInputEmpty(billInput);
	if (!isEmpty) {
		let x = this.value;
		bill = parseFloat(x < 0 ? 1 : x > 32000 ? 32000 : x, 10);
		billInput.value = bill;
		if (calcTip) {
			calcTipPerPerson(numberPeople);
			calcTotalTipPerPerson(numberPeople);
		}
	} else {
		bill = 0;
	}
});

inputNumber.addEventListener('input', function () {
	let x = this.value;
	let isEmpty = isInputEmpty(inputNumber);

	if (!isEmpty) {
		calcTip = true;
		tip = x < 0 ? 0 : x > 100 ? 100 : x;

		inputNumber.value = tip;
		tipPercentage = parseInt(tip, 10);
		calcTipPerPerson(numberPeople);
		calcTotalTipPerPerson(numberPeople);
	} else {
		calcTip = false;
	}
});

inputNumber.addEventListener('click', clearBtns);

peopleInput.addEventListener('input', function () {
	let x = parseInt(this.value, 10);
	if (x === 0) {
		peopleInput.classList.add('error');
		errMsg.classList.remove('hidden');
		return;
	}
	peopleInput.classList.remove('error');
	errMsg.classList.add('hidden');
	let isEmpty = isInputEmpty(peopleInput);
	if (!isEmpty) {
		numberPeople = x;
		calcTip = true;
		calcTipPerPerson(numberPeople);
		calcTotalTipPerPerson(numberPeople);
	} else {
		numberPeople = 1;
		calcTipPerPerson(numberPeople);
		calcTotalTipPerPerson(numberPeople);
	}
});

calcBtns.addEventListener('click', function (e) {
	const btn = e.target.closest('.tip-btn');
	if (!btn) return;
	clearBtns();
	btn.classList.add('active');
	enableResetButton();
	calcTip = true;
	const btnNumber = parseInt(btn.innerText, 10);
	tipPercentage = btnNumber;
	calcTipPerPerson(numberPeople);
	calcTotalTipPerPerson(numberPeople);
});

resetBtn.addEventListener('click', function () {
	if (!canReset) {
		return;
	}
	clearBtns();
	resetCalcInputs();
	calcTip = false;
	numberPeople = 1;
	bill = 0;
	disableResetButton();
});
