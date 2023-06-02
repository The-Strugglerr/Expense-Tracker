'use strict';

// BANKIST APP

////////////////////////////////////////////////////////////////////////

// USER DATA

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////

//ALL THE ELEMENTS

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = /** @type {HTMLElement} */ (
  document.querySelector('.app')
);

// here /** @type {HTMLElement} */ helps to show style intellisense in this containerApp
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

//below function create user name for every account

const createUserNames = function (acc) {
  acc.forEach(function (mov) {
    mov.userName = mov.owner
      .toLowerCase()
      .split(' ')
      .map(acc => acc[0])
      .join('');
  });
};

createUserNames(accounts);

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

//Below function Display the tansaction

const movementsBox = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, index) {
    let transaction;
    if (mov > 0) {
      transaction = 'deposit';
    } else {
      transaction = 'withdrawal';
    }

    let html = `<div class="movements__row">
    <div class="movements__type movements__type--${transaction}">${
      index + 1
    } ${transaction}</div>
   
    <div class="movements__value">${mov}€</div>
    </div>;
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

//below function account balances

const displayBalance = function (account) {
  account.totalBalance = account.movements.reduce((acc, movv) => acc + movv, 0);
  labelBalance.textContent = `${account.totalBalance} €`;
};

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

//below function display all the deposits in the accounts

const allDesposits = function (acc) {
  const totalDesposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, movv) => acc + movv, 0);
  labelSumIn.textContent = `${totalDesposits}€`;
};

//below function display all the withdrawal in the accounts

const allWithdrawal = function (acc) {
  const totalWithdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, movv) => acc + movv, 0);
  labelSumOut.textContent = `${Math.abs(totalWithdrawal)}€`;
};

//below function display all the intrest on every transaction suppose bank pays 1.5 interest on every deposit

const allInterest = function (acc) {
  const totalInterest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => dep * (acc.interestRate / 100))
    .reduce((acc, movv) => acc + movv, 0);
  labelSumInterest.textContent = `${Math.abs(totalInterest)}€`;
};

/////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

// UI FUNCTION

const showUi = function (acc) {
  // all the transactions
  movementsBox(acc.movements);

  //all deposit withdraw total amount interest

  allDesposits(acc);

  allWithdrawal(acc);

  allInterest(acc);

  //overall balance of account
  displayBalance(acc);
};

/////////////////////////////////////////////////////////////////////////

//Here we will work on login system first we enter user and pin then we get to display the details of account if input credentials match the original

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //here given button is button of login form so in html default behaviour is that page gets reload when we submit the input login form so to prevent it we use below method
  e.preventDefault(); // e is the event parameter

  //finding the account with given username
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  //checking if pin is correct or not
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display the welcome message and UI
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = '100';

    //emptying the input field

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //now since after the login we have to calcalate the total deposit withdraw total amount interest and all the transactions so we need to call all those above fucntions here

    //show UI of the app

    showUi(currentAccount);

    console.log(currentAccount);
  }
});

/////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////

//lets work upon tranfer button

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  //emptying the transfer field
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  const amount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(
    account => account.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    reciverAccount &&
    amount <= currentAccount.totalBalance &&
    reciverAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    reciverAccount.movements.push(amount);
    showUi(currentAccount);
  }
});

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

//we get loan only if there is deposit in our account that is 10 per of requested loan

////////////////////////////////////////////////////////////////

//Now lets talk about close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //emptying the close field

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      account => account.userName === currentAccount.userName
    );

    //delete currentAccount
    accounts.splice(index, 1);

    //hide ui
    containerApp.style.opacity = '0';
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputTransferAmount.blur();
});

////////////////////////////////////////////////////////////////////////
