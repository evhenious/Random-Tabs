import { initLesson } from './config.js';

initLesson('JS Lesson 06', 'Модуль 3. Заняття 6. Деструктурізація. spread|rest');

//? ----------------------------------------------- питання з таблиці-----------------



const testObject = {
  outerName: 'i am a test',
  phone: 9799998888777,
  innerObj: {
    innerName: 'i am inside'
  }
}

// testObject.name
// const { outerName, phone: outerPhone, innerObj: { innerName } } = testObject;
// const outerPhone = testObject.phone;
const { outerName, ...newObj } = testObject;

// console.log(outerName, outerPhone, innerName);
console.log('new obj', newObj);



// масиви
const testArray = [1, 45, 8, 42, 81];
const [ firstElem, secondElem, ...newArray ] = testArray;
console.log('array', firstElem, secondElem, newArray);



// параметри за замовчанням + деструктурізація в оголошенні функції
function foo({ username } = {}) { // те саме що function foo(incomingObject = {}) {
  console.log(username);
}

foo();
foo({});
const obj = { username: 'test'}
foo(obj);




















//? З конспекту: Тобто tems  &  copyOfTemps не зв'язані між собою?
//? Це є різні посилання в яких лежать однакові значення масивів?
// const temps = [14, -4, 25, 8, 11];

// // Это точная, но независимая копия массива temps
// const copyOfTemps = [ ...temps ];
// console.log(temps); // [14, -4, 25, 8, 11]
// console.log(copyOfTemps); // [14, -4, 25, 8, 11]
















//? Приклад з нашого конспекту: чому під час spread у нас додаються
//? спочатку змінна first, а потім second, начебто не по порядку


// const first = { propA: 5, propB: 10, propC: 50 };
// const second = { propC: 15, propD: 20 };

// const third = { ...first, ...second };
// // third = { propA: 5, propB: 10, propC: 50  }
// //                      + propC: 15, propD: 20

// console.log('third', third); // { propA: 5, propB: 10, propC: 15, propD: 20 }

// const fourth = { ...second, ...first };
// // third = { propC: 15, propD: 20 }
// //                  + { propA: 5, propB: 10, propC: 50 }

// console.log('fourth', fourth); // { propA: 5, propB: 10, propC: 50, propD: 20 }



















//? чому userLikes -> 1308 ????
const user = {
  name: "Jacques Gluke",
  tag: "jgluke",
  stats: {
    followers: 5603,
    views: 4827,
    likes: 1308,
  },
};

const {
  name,
  tag,
  stats: { followers, views: userViews, likes: userLikes = 0 },
} = user;

console.log(name); // Jacques Gluke
console.log(tag); // jgluke
console.log(followers); // 5603
console.log(userViews); // 4827
console.log(userLikes); // 1308 -
// тому що дефолтне значення для userLikes використається тільки якщо
// в об'єкті user.stats не буде ключа likes - а він там є


















//? Питання по decreaseQuantity - з кожною ітерацією ми віднімаємо -1 від загальної
//? кількості продукту і відповідно у консоль виводиться 0 (quantity of grapes = 3,
//? 3 ітерації, і відповідно 0) - але як виправити мою помилку і зробити так,
//? щоб при виклику методу було 2? Просто через for? Дякую!

// const cart = {
//   items: [],

//   getItems() {
//     return this.items;
//   },

//   add(product) {
//     for (const item of this.items) {
//       if (item.name === product.name) {
//         item.quantity += 1;
//         return;
//       }
//     }

//     const newProduct = {
//       ...product,
//       quantity: 1,
//     };

//     this.items.push(newProduct);
//   },

//   remove(productName) {
//     for (let i = 0; i < this.items.length; i += 1) {
//       const item = this.items[i];
//       if (productName === item.name) {
//         this.items.splice(i, 1);
//         return;
//       }
//     }
//   },

//   clear() {
//     return (this.items = []);
//   },

//   countTotalPrice() {
//     let total = 0;
//     for (const item of this.items) {
//       total += item.price * item.quantity;
//     }
//     return total;
//   },

//   /**
//    *
//    * @param {string} productName
//    * @returns {number | nul}
//    */
//   decreaseQuantity(productName = '') {
//     for (const item of this.items) {
//       if (item.name === productName) {
//         // item.quantity -= 1;
//         return (item.quantity -= 1);
//       }
//     }

//     return null;
//   },
// };

// console.log(cart.getItems());

// cart.add({ name: 'apple', price: 50 });
// cart.add({ name: 'lemon', price: 60 });
// cart.add({ name: 'grapes', price: 40 });
// cart.add({ name: 'strawberry', price: 110 });
// cart.add({ name: 'strawberry', price: 110 });
// cart.add({ name: 'grapes', price: 40 });

// cart.remove('lemon');

// cart.add({ name: 'strawberry', price: 110 });
// cart.add({ name: 'grapes', price: 40 });

// console.table(cart.getItems());
// console.log('Total:', cart.countTotalPrice());

// console.table('Зменшити кількість:', cart.decreaseQuantity('grapes'));


//? ----------------------------------------------------------------------------------






















//? ## Example 0 - Деструктуризація
/*
Переписати функцію так, щоб приймала один об'ект параметрів, замість набору
незалежних аргументів.
*/

/**
 * @param {Object} param
 * @param {string} param.weight
 * @param {string} param.height
 *
 * @returns {number}
 */
function calcBMI({ weight, height }) {
  const numericWeight = Number(weight.replace(',', '.'));
  const numericHeight = Number(height.replace(',', '.'));
  return Number((numericWeight / numericHeight ** 2).toFixed(1));
}

// Те що зараз:
// console.log(calcBMI('88,3', '1.75'));
// console.log(calcBMI('68,3', '1.65'));
// console.log(calcBMI('118,3', '1.95'));

// Очікується наступне
// console.log(
//   calcBMI({
//     weight: '88,3',
//     height: '1.75',
//   }),
// );

// console.log(
//   calcBMI({
//     weight: '68,3',
//     height: '1,65',
//   }),
// );

// console.log(
//   calcBMI({
//     weight: '118.3',
//     height: '1,95',
//   }),
// );


















//? ## Example 1 - Деструктуризація
/*
Переписати функцію так, щоб приймала один об'ект параметрів, замість набору
незалежних аргументів.
*/

function printContactsInfo({ names = '', phones = '' }) {
  // function printContactsInfo(params) {
  // const { names = '', phones = '' } = params;

  const nameList = names.split(',');
  const phoneList = phones.split(',');

  for (let i = 0; i < nameList.length; i += 1) {
    console.log(`user: ${nameList[i]} | tel.: ${phoneList[i]}`);
  }
}

const names = 'Jacob,William,Solomon,Nicolas';
const phones = '89001234567,89001112233,890055566377,890055566300';

// Те що зараз:
// printContactsInfo(names, phones);

// Очікується
// printContactsInfo({
//   names: 'Jacob,William,Solomon,Nicolas',
//   phones: '89001234567,89001112233,890055566377,890055566300',
// });


// const arg1 = 'test';
// const arg2 = 42;
// const params = {/* купа всього іншого */};
// function test(arg1, arg2, params);


















//? ## Example 2 - Deep destructure
/*
Переписати функцію так, щоб приймала один об'ект параметрів, замість набору
незалежних аргументів.
*/

// function getStorageReport(companyName, repairBots, defenceBots) {
// return `${companyName} has ${repairBots + defenceBots} bots in stock`;

// deep destr
// function getStorageReport(companyName, bots: { repair, defence }) {

function getStorageReport({ companyName, bots }) {
  const { repair: repairBots = 0, defence: defenseBots = 0 } = bots;
  // return `${companyName} has ${repair + defense} bots in stock`;
  return `${companyName} has ${repairBots + defenseBots} bots in stock`;
}

// Те що зараз:
// console.log(getStorageReport('Cyberdyne Systems', 150, 50));

// Очікується:
// console.log(
//   getStorageReport({
//     companyName: 'Cyberdyne Systems',
//     bots: {
//       repair: 150,
//       defence: 50,
//     }
//   })
// ); // "Cyberdyne Systems has 200 bots in stock"

// //? якщо один із типів ботів опціональний?
// console.log(
//   getStorageReport({
//     companyName: 'Tesla Robot Systems',
//     bots: {
//       repair: 150
//     }
//   })
// ); // "Cyberdyne Systems has 200 bots in stock"




















//? ## Example 3 - Деструктуризація
/*
Переписати функцію з Ex.4 так щоб об'єкт параметрів містив властивості
`companyName` і `storage` - щоб функція була універсальною для будь-якої компанії
з будь-яким товаром на складі
*/

function getStockReport({ companyName, storage }) {
  const itemAmounts = Object.values(storage);
  console.log(companyName, itemAmounts);

  let total = 0;
  for (const item of itemAmounts) {
    total += item;
  }

  return `${companyName} has ${total} item in stock`;
}

// Приклади очікуваних викликів:
// console.log(
//   getStockReport({
//     companyName: 'Cyberdyne Systems',
//     storage: {
//       repairBots: 150,
//       defenceBots: 50,
//     },
//   }),
// ); // "Cyberdyne Systems has 200 items in stock"

// console.log(
//   getStockReport({
//     companyName: 'Belacci',
//     storage: {
//       shoes: 20,
//       bags: 10,
//       hats: 5,
//     },
//   }),
// ); // "Belacci has 35 item in stock"

















//? ## Example 4 - spread
/*
Доповнити функцію `createContact(contactInfo)`так щоб новий контакт створювався
з додаванням властивостей `id` і `createdAt`, а також із
властивістю (`list`: 'default')
якщо властивості list у контакта іще нема
*/

function createContact(contactInfo = {}) {
  const newContact = {
    id: generateId(),
    createdAt: Date.now(),
    list: 'default',
    ...contactInfo
  };

  return newContact;
}


/**
 * Генератор випадкових id
 * @returns {string}
 */
function generateId() {
  return '_' + Math.random().toString(36).slice(2, 9);
}


// приклади виклику
// console.log(
//   createContact({
//     name: 'Dan',
//     email: 'danny@some-email.com',
//     list: 'friends',
//   }),
// );

// console.log(
//   createContact({
//     name: 'Natalie',
//     email: 'natalie.summers@another-mail.co.uk',
//   }),
// );




























//?  ## Example 5 - rest
/*
Написати функцію `transformUser(user)` так, щоб повертати новий об'єкт
із властивістю `fullName`, замість `firstName` і `lastName`.
*/

function transformUser(user = {}) {
  const { firstName, lastName, ...baseUser } = user;
  // console.log('baseUser', baseUser);

  return {
    ...baseUser,
    fullName: `${firstName} ${lastName}`
  }
}

// приклади:
console.log(
  transformUser({
    id: 1,
    firstName: 'Jacob',
    lastName: 'Mercer',
    email: 'j.mercer@some-mail.com',
    friendCount: 40,
  }),
);

console.log(
  transformUser({
    id: 2,
    firstName: 'Adrian',
    lastName: 'Cross',
    email: 'a.cross@some-new-mail.com',
    friendCount: 20,
  }),
);

// у мене не приймає хоч я можна сказати скопіювала з теорії
// function calculateMeanTemperature({ today: { low: todayLow = 37, high = 40 }, tomorrow: {low = 33, high = 38}}) {
//   return (todayLow + todayHigh + tomorrowLow + tomorrowHigh) / 4;
// }


function calculateMeanTemperature({ today, tomorrow }) {
  // { today: { low: todayLow = 37, high = 40 }, tomorrow: {low = 33, high = 38} }
  const { low: todayLow = 37, high: todayHigh = 40  } = today;
  const { low: tomorrowLow = 37, high: tomorrowHigh = 40  } = tomorrow;

  return (todayLow + todayHigh + tomorrowLow + tomorrowHigh) / 4;
}