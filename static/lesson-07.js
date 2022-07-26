import { initLesson } from './config.js';

initLesson(
  'JS Lesson 07',
  'Модуль 4. Заняття 7. Колбек, стрілочні функції.'
);




function doStuff() {
  console.log('hi there callback 1 - doStuff');
}


const doAnotherStuff = function () {
  console.log('hi there callback 2 - doAnotherStuff');
}

// doStuff();
// doAnotherStuff();


function acceptsCallback(callback) {
  console.warn('i am high order fn');
  callback();
}

//
acceptsCallback(doStuff);
acceptsCallback(doAnotherStuff);




//? ----------------------------------------------- питання з таблиці-----------------


//? Тільки в мене ця функція не виводить "Привіт?
// const greet = () => {
//   console.log("Привіт!");
// };

// greet();


















/* якщо вивести у консоль дану функцію, то воно виведе нам:

Реєструємо гостя Манго.
Реєструємо гостя Полі.

При цьому ми викликали функцію з таким рядком лише для 'Манго',
воно просто підставило ім'я 'Полі' з наступного виклику, чи тут якісь ультра складні штуки? */

/**
 * @param {string} name
 * @param {Function} callback
 */
function registerGuest(name, callback) {
  console.warn(`Реєструємо гостя ${name}.`);
  callback(name);
}

// //! Виклик #1
function greet(name) {
  console.log(`Ласкаво просимо ${name}.`);
}

const doGeet = (name) => {
  console.log(`Ласкаво просимо ${name}.`);
}

registerGuest("Манго", greet);

// //! Виклик #2
registerGuest("Полі", function notify(name) {
  console.log(`Шановний(а) ${name}, ваш номер буде готовий за 30 хвилин.`);
});

// //! Виклик #3 анонімна
registerGuest("Третій", function (name) {
  console.log(`Шановний(а) ${name}, ваш номер буде готовий за 30 хвилин.`);
});

registerGuest("4", (name) => {
  console.log(`Шановний(а) ${name}, ваш номер буде готовий за 30 хвилин.`);
});

// //? анонімні функції?
function callBackend(onSuccess) {
  // запрос на беккенд за даними
   onSuccess();
}























//? Не зрозуміло як у наш колбек з параметром (name) підставилось значення
//? аргументу (recipient), адже воно ж знаходиться у параметрі нашої функції processCall

function processCall(recipientName = '', onAvailable, onNotAvailable) {
  // Імітуємо доступність абонента випадковим числом
  //! 50/50 що абонент буде доступний
  const isAvailable = Math.random() > 0.5;

  // !false => true
  if (!isAvailable) {
    console.warn('failed....');
    onNotAvailable(recipientName);
    return;
  }

  console.warn('ok....');
  onAvailable(recipientName);
  // takeCall(name)
}

// Логіка прийняття дзвінка
function takeCall(name) {
  console.log(`З'єднуємо з ${name}, очікуйте...`);
}

// Логіка активації автовідповідача
function activateAnsweringMachine(name) {
  console.log(`Абонент ${name} недоступний, залиште повідомлення.`);
}

// Логіка запису голограми
function leaveHoloMessage(name) {
  console.log(`Абонент ${name} недоступний, записуємо голограму.`);
}

processCall("Манго", takeCall, activateAnsweringMachine);
processCall("Полі", takeCall, leaveHoloMessage);











//? Функция высшего порядка(higher order function) - функция,
//? принимающая в качестве параметров другие функции или возвращающая
//? функцию как результат. Т.е. нужен Return или нет

// const pizzas = ['margarita', 'pepperoni'];

// function makeOrder(pizzaName = '', onSuccess, onError) {
//   if (pizzas.includes(pizzaName)) {
//     const result = onSuccess(pizzaName);
//     console.warn(result);
//     return;
//     // return onSuccess(pizzaName);
//   }

//   onError(`There is no pizza with name ${pizzaName}.`);
// }

// function makeAnotherOrder(pizzaName, onSuccess, onError) {
//   if(pizzas.includes(pizzaName)) {
//     onSuccess(pizzaName);
//     return;
//   }

//   onError(`There is no pizza with a name ${pizzaName}`);
// }

// const successCallback = (name) => {
//   // console.log(`Pizza ${name} is READY`);
//   return `Pizza ${name} is READY`;
// }

// const failCallback = (logString) => {
//   console.log(logString);
// }

// makeOrder('pepperoni', successCallback, failCallback);
/*
  makeOrder('pepperoni', successCallback, failCallback)
    - const result = onSuccess('pepperoni');
      - onSuccess('pepperoni') === successCallback('pepperoni')


*/
//? ----------------------------------------------------------------------------------













//? ## Example 0 - callbacks
/*
  Є функція createProduct, що отримує в параметрах базові дані якогось товару,
  додає в ці дані необхідні ключі (id, дату створення) і повертає
  створений продукт.

  Розширити можливості даної функції - щоб можна було передавати callback Fn,
  який createProduct має виконати в кінці після створення продукта.

  callback в параметрах має отримувати створений продукт
*/

/**
 * Генератор випадкових id
 * @returns {string}
 */
function generateId() {
  return '_' + Math.random().toString(36).slice(2, 9);
}

/**
 * @param {Object} partialData
 * @param {Function} onCreate
 *
 * @returns {Object} new product
 */
function createProduct(partialData, onCreate) {
  // old:
  // return {
  //   id: generateId(),
  //   createdAt: Date.now(),
  //   ...partialData
  // };
  const newProduct = {
    id: generateId(),
    createdAt: Date.now(),
    ...partialData,
  };

  onCreate(newProduct);
}

const firstCallback = (product) => {
  console.log(product);
}

// old call
// console.log( createProduct({ title: 'i am the object' }) );

createProduct({ title: 'i am the object' }, firstCallback);

// v2
createProduct({ title: 'i am the object\'s father' }, (product) => { console.warn(product) });

























//? ## Example 1 - callbacks
/*
  Додайте об'екту `account` методи `withdraw(amount, onSuccess, onError)` і
  deposit(amount, onSuccess, onError)`, де первший параметр - сума операціі, а
  другий і третій - колбеки.

  Метод `withdraw` викликає onError якщо amount більше ніж TRANSACTION_LIMIT або
  this.balance, і onSuccess в інших випадках.

  Метод `deposit` викликає onError якщо amount більше TRANSACTION_LIMIT або менше
  чи дорівнює нулю, і onSuccess в інших випадках.
*/

const TRANSACTION_LIMIT = 1000;

const account = {
  username: 'Mark Zuckerberg',
  balance: 400,

  withdraw(amount = 0, onSuccess, onError) {
    if (amount > TRANSACTION_LIMIT) {
      onError();
      console.error(`Transaction limit ${TRANSACTION_LIMIT} reached.`);
      return;
    }

    if (amount > this.balance) {
      onError();
      console.error(`Insufficient balance - ${this.balance}!`);
      return;
    }

    if (!amount) {
      onError();
      console.error(`Withdraw amount can not be 0!`);
      return;
    }

    // successful Withdraw
    onSuccess();
    this.balance -= amount;
    console.log(`New account balance: ${this.balance}`);
  },

  deposit(amount = 0, onSuccess, onError) {
    if (amount > TRANSACTION_LIMIT) {
      onError();
      console.error(`Transaction limit ${TRANSACTION_LIMIT} reached.`);
      return;
    }

    if (amount <= 0) {
      onError();
      console.error(`Deposit amount must be more than 0!`);
      return;
    }

    // successful Deposit
    this.balance += amount;
    onSuccess(`New account balance: ${this.balance}`);
  },
};

const doOnError = () => {
  console.error('hello from onError callback');
}

const doOnSuccess = () => {
  console.log('hello from onSuccess callback!');
}

const doMoreOnSuccess = (consoleString = '') => {
  console.log(consoleString);
}

// Usage as for now:
account.withdraw(20_000, doOnSuccess, doOnError);
account.withdraw(20, doOnSuccess, doOnError);
account.withdraw(0, doOnSuccess, doOnError);

account.deposit(100, doMoreOnSuccess, doOnError);
account.deposit(0, doMoreOnSuccess, doOnError);
























//? Example 2 - arrow Fn, callback, forEach
/*
  Зробити рефакторінг даного кода - використати forEach вбудований в масив
*/
const logArrayItem = (item) => {
  console.log(`We have: ${item} in callback v2`);
}

/**
 * @param {any[]} items
 */
function logItems(items) {
  console.log('-- with inner callback');
  // old
  // for (const item of items) {
  //   console.log(`We have: ${item}`);
  // }

  const innerCallback = (item) => {
    console.log(`We have: ${item} in inner callback`);
  }

  // new
  items.forEach(innerCallback);
}

logItems(['Sun', 'Mercury', 'Venus', 'Earth', 'Moon', 'Mars']);
logItems([42, 18, 735]);

/**
 * @param {any[]} items
 * @param {Function} outerCallback
 */
function logItemsWithOuterCallback(items, outerCallback) {
  console.log('-- with outer callback');
  // old
  // for (const item of items) {
  //   console.log(`We have: ${item}`);
  // }

  // new
  items.forEach(outerCallback);
}

// Usage as for now:
logItemsWithOuterCallback(['Sun', 'Mercury', 'Venus', 'Earth', 'Moon', 'Mars'], logArrayItem);
logItemsWithOuterCallback([42, 18, 735], logArrayItem);


//? А якщо:
//?  - ми будемо отримувати функцію для виконання ззовні (в параметрах)?
























//? Example 3 - arrow Fn, callback, forEach
/*
  Написати функцію executeForEach(array, callback), яка першим параметром отримує
  масив, а другим - callback, який має виконатись для кожного елемента в масиві.

  Функція має повертати новий масив, в якому будуть результати виклику нашого
  callback для елементів з вхідного масиву
*/

function executeForEach(incomingArray = [], transformItem) {
  const result = [];

  incomingArray.forEach((item) => {
    // зробили анонімний колбек-стрілку -
    // бо інакше в даному випадку ми не можемо покласти в масив result
    // результат роботи нашого колбека transformItem
    const processedItem = transformItem(item);
    result.push(processedItem);
  });

  return result;
}

const testArray = [42, 43, 44];

// міняємо тільки колбек - але від цього повністю міняється масив, який
// повертає executeForEach
const testCallback = (item) => item; // колбек повертає отриманий елемент, нічого з ним не робить
const testCallback2 = (item) => item * 2;
const testCallback3 = (item) => `There was ${item}`;


console.log(
  executeForEach(testArray, testCallback3)
);

























//? Example 4 - arrow Fn, callback, forEach
/*
  Зробити рефакторінг даного кода - використати forEach вбудований в масив,
  а також стрілочні функції
*/

/**
 * Розбиває строки names і phones на окремі елементи, і виводить в консоль
 * ім'я з відповідним телефонним номером
 * @param {Object} params
 * @param {string} params.names
 * @param {string} params.phones
 */
 function printContactsInfo({ names, phones }) {
  const nameList = names.split(',');
  const phoneList = phones.split(',');

  for (let i = 0; i < nameList.length; i += 1) {
    console.log(`${nameList[i]}: ${phoneList[i]}`);
  }
}
