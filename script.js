'use strict';

// BANKIST APP

////////////////////////////////////////////////////////////////////////

// USER DATA

const account1 = {
  owner: 'Rahul Yadav',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2022-04-08T14:11:59.604Z',
    '2023-01-12T10:51:36.790Z',
    '2023-02-11T23:36:17.929Z',
    '2023-03-27T17:01:17.194Z',
  ],
  currency: 'INR',
  locale: 'en-in',
};

const account2 = {
  owner: 'Arvind sharma',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-04T18:49:59.371Z',
    '2023-06-05T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-in',
};

const account3 = {
  owner: 'Vaibhav Aggrawal',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-09-01T13:15:33.035Z',
    '2022-10-30T09:48:16.867Z',
    '2022-12-21T06:04:23.907Z',
    '2023-01-23T14:18:46.235Z',
    '2023-01-26T16:33:06.386Z',
    '2023-02-13T14:43:26.374Z',
    '2023-03-12T18:49:59.371Z',
    '2023-04-01T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-in',
};

const account4 = {
  owner: 'Mridul Gupta',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-01T12:01:20.894Z',
    '2023-01-05T16:33:06.386Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-03T18:49:59.371Z',
    '2023-04-12T14:43:26.374Z',
  ],
  currency: 'INR',
  locale: 'en-in',
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

// Dates function

const showDates = function (date, locale) {
  const daysdiff = (date1, date2) => {
    return Math.trunc(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const showdays = daysdiff(new Date(), date);
  console.log(showdays);

  if (showdays == 0) return `Today`;
  if (showdays == 1) return `Yesterday`;
  if (showdays <= 7) return `${showdays} Days Passed`;

  const formatt = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, formatt).format(date);

  // const tday = `${date.getDate()}`.padStart(2, '0');
  // const tmonth = `${date.getMonth() + 1}`.padStart(2, '0');
  // const tyear = date.getFullYear();

  // // const thour = `${date.getHours()}`.padStart(2, '0');
  // // const tmin = `${date.getMinutes()}`.padStart(2, '0');
  // return `${tday}/${tmonth}/${tyear} `;
};

////////////////////////////////////////////////////////////////////////

//Below function Display the tansaction

const movementsBox = function (acc, sortt) {
  containerMovements.innerHTML = '';

  acc.movements = sortt
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  acc.movements.forEach(function (mov, index) {
    let transaction;
    if (mov > 0) {
      transaction = 'deposit';
    } else {
      transaction = 'withdrawal';
    }

    const now = new Date(acc.movementsDates[index]);

    let html = `<div class="movements__row">

                <div class="movements__type movements__type--${transaction}">${
      index + 1
    } ${transaction}</div>
                <div class="movements__date">${showDates(now, acc.locale)}</div>
                <div class="movements__value">${new Intl.NumberFormat(
                  acc.locale,
                  {
                    style: 'currency',
                    currency: acc.currency,
                  }
                ).format(mov)}
                </div>
              </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

//below function account balances

const displayBalance = function (account) {
  account.totalBalance = account.movements.reduce((acc, movv) => acc + movv, 0);

  const bal = new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(account.totalBalance);

  labelBalance.textContent = `${bal}`;
  // console.log(bal);
};

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

//below function display all the deposits in the accounts

const allDesposits = function (acc) {
  const totalDesposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, movv) => acc + movv, 0);
  labelSumIn.textContent = `${new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(totalDesposits)}`;
};

//below function display all the withdrawal in the accounts

const allWithdrawal = function (acc) {
  const totalWithdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, movv) => acc + movv, 0);
  labelSumOut.textContent = `${new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(Math.abs(totalWithdrawal))}`;
};

//below function display all the intrest on every transaction suppose bank pays 1.5 interest on every deposit

const allInterest = function (acc) {
  const totalInterest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => dep * (acc.interestRate / 100))
    .reduce((acc, movv) => acc + movv, 0);
  labelSumInterest.textContent = `${new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(Math.abs(totalInterest))}`;
};

/////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

// UI FUNCTION

const showUi = function (acc) {
  // all the transactions
  movementsBox(acc);

  //all deposit withdraw total amount interest

  allDesposits(acc);

  allWithdrawal(acc);

  allInterest(acc);

  //overall balance of account
  displayBalance(acc);
};

/////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

// lets set the login timer here
const setTimeInterval = function () {
  const tick = function () {
    if (time == 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = '0';
    }
    const minute = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${minute} : ${second}`;

    time--;
  };

  let time = 120;

  tick();
  return setInterval(tick, 1000);
};

////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

//Here we will work on login system first we enter user and pin then we get to display the details of account if input credentials match the original

let currentAccount, timer;

// currentAccount = account1;
// showUi(currentAccount);
// containerApp.style.opacity = '100';

btnLogin.addEventListener('click', function (e) {
  //here given button is button of login form so in html default behaviour is that page gets reload when we submit the input login form so to prevent it we use below method
  e.preventDefault(); // e is the event parameter

  //finding the account with given username
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  //checking if pin is correct or not
  if (currentAccount?.pin === +inputLoginPin.value) {
    //display the welcome message and UI
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = '100';

    //emptying the input field

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // here the timer function is called we also check when we login to other accounts our timer lget reset
    if (timer) clearInterval(timer);

    timer = setTimeInterval();

    const format = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      format
    ).format(new Date());

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

  const amount = +Math.floor(inputTransferAmount.value);
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
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAccount.movementsDates.push(new Date().toISOString());

    showUi(currentAccount);
  }
  //emptying the transfer field
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  // we get logout after certain time that why we set timer but will happen only there is no activity in account but activity like transfer happen then we need to reset that timer

  clearInterval(timer);
  timer = setTimeInterval();
});

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

//we get loan only if there is deposit in our account that is 10 per of requested loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(+inputLoanAmount.value);
    currentAccount.movementsDates.push(new Date().toISOString());
    showUi(currentAccount);
  }

  inputLoanAmount.value = '';

  // we get logout after certain time that why we set timer but will happen only there is no activity in account but activity like transfer happen then we need to reset that timer

  clearInterval(timer);
  timer = setTimeInterval();
});

////////////////////////////////////////////////////////////////

//Now lets talk about close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //emptying the close field

  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
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

////////////////////////////////////////////////////////////////////////

//lets talk about sort button
// when we press sort button our movements get sorted but when we press it again i will get back to normal state
//now we have to chage ui of movements everytime we press sort button so we need to change of display moments function we need to add sortt parameter to it to understand refer movement function

let sortedState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('hi');
  movementsBox(currentAccount, !sortedState);
  sortedState = !sortedState;
});
