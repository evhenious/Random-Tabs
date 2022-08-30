import { initLesson } from './config.js';

initLesson('JS Lesson 05', 'Модуль 3. Заняття 5. Об\'єкти.');

//? ----------------------------------------------- питання з таблиці-----------------
//? Як виглядає ключ, обгорнутий в кавички?
//? Бо бачу лише значення ключа в кавичках, а не ключ.

// const song = {
//   genre: 'metal',
//   '22this is key': 'this is value'
// }

// console.log(song);








// ? Чого тут треба писати color а не colors
const colors = [
  { hex: "#f44336", rgb: "244,67,54" },
  { hex: "#2196f3", rgb: "33,150,243" },
  { hex: "#4caf50", rgb: "76,175,80" },
  { hex: "#ffeb3b", rgb: "255,235,59" },
];

const hexColors = [];
const rgbColors = [];

// Change code below this line
for (const color of colors) {

  // тому що color - поточний об'єкт із масива colors на даній ітерації
  // і ви з нього дістаєте значення по ключах hex і rgb
  hexColors.push(color.hex);
  rgbColors.push(color.rgb);
};

console.log(hexColors, rgbColors);














//? Нащо робити [propName], чому б не просто скорочені властивості?
const propName = "name";

const userData = {
  age: 25,
  // Ім'я цієї властивості буде взяте зі значення змінної propName
  [propName]: "Генрі 'з-конспекту' Сібола",
  // name: "Генрі 'з-конспекту' Сібола"
};

// console.log(userData.name); // 'Генрі 'з-конспекту' Сібола'





const contentA = {
  type: 'movie',
  name: 'Iron Man 4.5',
  rating: null
};

const contentB = {
  type: 'episode',
  name: 'The Walking Dead S1 Ep4',
  tv_rating: null
}

const contentC = {
  type: 'actor',
  name: 'Will Smith',
  age: 42
}


function setRating(content, rating) {
  const ratingKey = content.type === 'movie' ? 'rating' : 'tv_rating';
  content[ratingKey] = rating;
}



const config = {
  movie: 'rating',
  episode: 'tv_rating'
}

/*
  const ratingKey = config[ content.type ];
                  = config[ 'movie' ]
  const ratingKey = 'rating'
*/

function setRating(content, rating) {
  const ratingKey = config[content.type];

  if (!ratingKey) {
    console.warn('у актора немає рейтингу!');
    return;
  }

  content[ratingKey] = rating;
}

/*
  setRating(contentA, 'PG13')
  const ratingKey = config[contentA.type];
                  = config['movie']
  const ratingKey = 'rating'
*/


setRating(contentA, 'PG13');
setRating(contentB, 'R');
setRating(contentC, 'R');


console.log('contentA', contentA);
console.log('contentB', contentB);
console.log('contentC', contentC);


//? ----------------------------------------------------------------------------------



//? ## Example 0 - Базові операції з об'єктами

// Написати скрипт, який послідовно зробить наступні дії з об'єктом 'user':
const user = {
  name: 'Simon',
  age: 25,
  hobby: 'swimming',
  isPremium: true,
  addNewKey(keyName, keyValue) {
    this[keyName] = keyValue
  }
};

// - додасть нову властивість `mood` із значенням 'happy'
user.mood = 'happy';
// v2 якщо ключ приходить десь ззовні
// user['mood'] = 'happy';


// - замінить значення `hobby` на 'birdwatching'
user.hobby = 'birdwatching';
// v2
// user['hobby'] = 'birdwatching';

// - замінить значення `premium` на 'false'
user.isPremium = false;
// v2
// user.isPremium = !user.isPremium;


// - виведе все що знаходиться всередині `user` в форматі `ключ:значення`
//   використовуючи `Object.keys()` + цикл `for...of`
const userKeys = Object.keys(user);
// цікаво, що в userKeys потраплять також і МЕТОДИ з об'єкта. Тож треба бути обережним при переборі )
console.log('userKeys', userKeys);

for (const key of userKeys) {
  console.log(`${key}: ${user[key]}`);
}

// - написати функцію яка буде додавати до об'єкта `user` передану в аргументах
//   властивість та її значення
// v1
const addNewKey = function (newKeyName, newKeyValue) {
  user[newKeyName] = newKeyValue;
}

addNewKey('country', 'US');

// v2 метод
user.addNewKey('city', 'NY');
user.addNewKey('favorite basketball team', 'Chicago Bull');



// видалити ключ hobby із об'єкта
delete user.hobby;
delete user['hobby']
console.log('user', user);















//? ## Example 1
/*
Є об'єкт `order`, який містить послуги одного замовлення на автосервісі
у формати (послуга: ціна). Написати код для виводу суми всього замовлення.
Якщо об'єкт пустий - результат має бути 0.
*/

const order = {
  carWash: 100,
  oilChange: 450,
  tyreRepair: 235
};

// код окремо
// const values = Object.values(order);

// let total = 0;
// for(const price of values) {
//   total += price;
// }

// оформлений як функція
function getOrderTotal(order) {
  // дістаємо всі ЗНАЧЕННЯ із ключів, бо точно знаємо
  // що там тільки потрібні нам цифри
  const values = Object.values(order);

  let total = 0;
  for(const price of values) {
    total += price;
  }

  return total;
}

console.log('total', total);
console.log('total from fn', getOrderTotal(order));

const emptyOrder = {};
console.log('empty total from fn', getOrderTotal(emptyOrder));


























//? ## Example 2 - Масив об'єктів
/*
Написати функцію `getPriceOfStones(storage, stoneName)`, що отримує дані про
запаси на складі (у вигляді масиву об'єктів) і потрібну назву товару.
Функція має для заданого каменя повертати загальну вартість запасів
на складі - ціна з урахуванням кількості

Якщо камінь не знайдено - повертати null і кидати помилку в консоль
Якщо камінь є в реєстрі але закінчився (quantity: 0) -
  повертати 0 і кидати ворнінг в консоль
*/

/**
 * @param {Object[]} storage посилання на масив "склада"
 * @param {string} stoneName назва каменя який будемо шукати (e.g. 'Emerald')
 */
function getPriceOfStones(storage, stoneName) {
  // 1. знайти потрібний товар
  let ourStone = null;

  for (const item of storage) {
    if (item.name === stoneName) {
      ourStone = item;
      break; // знайшли потрібне - зупиняємо цикл, бо сенсу далі йти нема
    }
  }

  if (!ourStone) {
    // товар НЕ знайдено
    console.error('Not found');
    return null;
  }

  console.log('ourStone', ourStone);

  // 2. підрахувати загальну вартість
  const totalPrice = ourStone.price * ourStone.quantity;

  if (!totalPrice) {
    // товар є, але закінчився
    console.warn('Not enough stones');
  }

  return totalPrice;
}

// це наш склад дорогоцінних каменів (на ювелирному заводі, чи іще де)
const storageContent = [
  { name: 'Emerald', price: 1300, quantity: 4 },
  { name: 'Diamond', price: 2700, quantity: 3 },
  { name: 'Sapphire', price: 900, quantity: 7 },
  { name: 'Pearl', price: 200, quantity: 0 },
];


console.log('total:', getPriceOfStones(storageContent, 'Diamond') );
console.log('total if stone not found:', getPriceOfStones(storageContent, 'test') );
console.log('total if stone found but quantity 0:', getPriceOfStones(storageContent, 'Pearl') );






















//? ## Example 3 - Комплексні задачі. STEREO Bank :)
/*
Написати скрипт для персонального кабінету інтернет-банкінга.
Є головний об'єкт `account`, в який необхідно додати методи роботи
з балансом та історією транзакцій.
*/

/**
 * Типів транзацкій всього два.
 * Можна покласти чи зняти гроші з рахунку.
 */
const TRANSACTIONS = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/**
 * Кожна транзакція це об'ект із полями: id, type, amount
 */
const account = {
  // Поточний баланс
  balance: 0,

  // Історія транзакцій
  transactions: [],

  /**
   * Повертає поточний стан балансу
   * @returns { number }
   */
  getBalance() {
    return this.balance;
  },

  /**
   * Створює і повертає нову транзацію за заданим типом і сумою
   * Кожна транзакція це об'ект із полями: id, type, amount
   * @param { number } amount
   * @param { string } type
   *
   * @returns { { id: number, amount: number, type: string } }
   */
  createTransaction(amount, type) {
    // порядок ключів в об'єкті не важливий впринципі, але є два підходи:
    // 1. ключі по алфавіту
    // 2. ключі по ступеню важливості (як тут у нас)
    return {
      id: Math.round( Date.now() * Math.random() ),
      type, // скорочений синтаксис від (type: type)
      amount,
    };
  },

  /**
   * Додає суму на баланс.
   * Створює запис в історії транзакцій (викликає для цього createTransaction)
   * @param {number} amount сума яка буде додана на баланс
   */
  deposit(amount) {
    const transaction = this.createTransaction(amount, TRANSACTIONS.DEPOSIT);
    this.transactions.push(transaction);

    this.balance += amount;
  },

  /**
   * Знімає суму з баланса.
   * Створює запис в історії транзакцій (викликає для цього createTransaction).
   *
   * Якщо недостатньо грошей - повертає null, пише ворнінг в консоль і не додає транзакцію
   * @param {number} amount сума яка буде знята з балансу
   * @returns { number | null }
   */
  withdraw(amount) {
    if (amount > this.balance) {
      // якщо запрошена сума більше баланса - транзакція не відбудеться
      console.warn('Недостатньо грошей');
      return null;
    }

    const transaction = this.createTransaction(amount, TRANSACTIONS.WITHDRAW);
    this.transactions.push(transaction);

    this.balance -= amount;
  },


  /**
   * Шукає транзакцію по заданому id.
   * Повертає null якщо транзакції с таким id не існує
   * @param {number} id id транзакції
   * @returns { Object }
   */
  getTransactionDetails(id) {
    let foundTransaction = null;

    for (const tr of this.transactions) {
      if (tr.id === id) {
        foundTransaction = tr;
        break;
      }
    }

    return foundTransaction;
  },

  /**
   * Повертає загальну суму транзакцій даного типу в історії
   * @param { string } type
   * @returns { number }
   */
  getTransactionTotalByType(type) {
    let total = 0;

    // шукаємо всі транзакції з заданим типом і додаємо звідти amount в наш total
    for (const tr of this.transactions) {
      if (tr.type === type) {
        total += tr.amount;
      }
    }

    return total;
  },
};


// test
console.log('1. getBalance:', account.getBalance());

account.deposit(1000);
console.log('2. getBalance + 1000:', account.getBalance());

account.withdraw(500);
console.log('3. getBalance - 500:', account.getBalance());

account.withdraw(100);
console.log('3. getBalance - 100:', account.getBalance());

console.log('4. transactions:', account.transactions);

// id щоразу випадкові, тому дістанемо якийсь вже існуючий айдішник
// і пошукаємо його, зробивши вигляд що ми НЕ ЗНАЄМО що він там точно є :)
const transactionId = account.transactions[1].id;
console.log(`5. transaction with id ${transactionId}`, account.getTransactionDetails(transactionId)
);

console.log(`6. total for type ${TRANSACTIONS.WITHDRAW}:`, account.getTransactionTotalByType(TRANSACTIONS.WITHDRAW));

// спроба залізти в кредит, коли кредитного ліміту нема
console.log('big withdraw', account.withdraw(5500));
