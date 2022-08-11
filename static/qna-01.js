import { initLesson } from './config.js';

initLesson('JS Q&A Session 01', 'Q&A по всіх темах з модулів 1 - 5.');

//? --------------------------------------------------------------------

//? 00 - чому не спрацьовує?
// Array.prototype.myMap = function () {
//   return this.map(...arguments); [cb]
// }

// console.log([1, 2, 3, 4].myMap( (x) => x ** 2) );



















//? 00 - array.reduce - коли початкове значення аккумулятора впливає, а коли ні

//* тут не впливає ------------------------------
const playersA = {
  mango: 1270,
  poly: 468,
  ajax: 710,
  kiwi: 244,
};

const playtimes = Object.values(playersA); // [1270, 468, 710, 244]

const totalPlayTime = playtimes.reduce((totalTime, time) => {
  // debugger;
  return totalTime + time;
}, 0); //! <-- тут 0 можна видалити
// const averagePlayTime = totalPlayTime / playtimes.length;
// console.log('v1', averagePlayTime);


//* а тут впливає, wtf? ---------------------------
const playersB = [
  { name: "Mango", playtime: 1270, gamesPlayed: 4 },
  { name: "Poly", playtime: 469, gamesPlayed: 2 },
  { name: "Ajax", playtime: 690, gamesPlayed: 3 },
  { name: "Kiwi", playtime: 241, gamesPlayed: 1 },
];

const totalAveragePlaytimePerGame = playersB.reduce((totalTime, player) => {
  // debugger;
  return totalTime + player.playtime / player.gamesPlayed;
}, 0); //! <-- а тут НІТ
// console.log('v2', totalAveragePlaytimePerGame);


















//? 00 - В яких випадках так пишеться і чи пишеться так взагалі?
//* part 1 --------------------
// let i = 0;
// ...

// for (; i < 10; i++) {
//   console.log(i)
// }

// console.warn(" ")
// for (; i < 20; i++) {
//   console.log(i)
// }

//* part 2 --------------------
// let j = 0;
// for (; j < 10; j++) {
//   console.log(j)
// }

// console.warn(" ")
// for (; j < 100; j += 199) {
//   console.log(j)
// }
// console.log('in the end', j);

//* part 3 --------------------
// let k = 0;
// for (let k = 0; k < 10; k += 1) { // 1 => false
//   console.log(k);

//   // короткий синтаксіс для if-else
//   if (k > 100) break; //! <--- запобіжник від нескінченного циклу
//   if (k > 100) {
//     // ...
//   } else break;
// }

// console.log(k)
// ? чому в консоль не спамить чи від цього в хрома є _паски безпеки_ ? НЕМА :)




















//? 00 - пару слів про Map і Set

// const myArr = [1, 2, 1, 45, 45, 8];
// const mySet = new Set();
// mySet.add(1);
// mySet.add(45);
// mySet.add(1);
// mySet.add(2);

// console.log(myArr);
// console.log(mySet);

// const uniqueArr = Array.from( new Set(myArr) );
// console.log(uniqueArr);


// // Map
// const obj = {
//   testKey: 'teat value'
// };

// obj['key'] = 'val';
// obj.testKey

// const myMap = new Map();
// myMap.set('key', 'val');
// myMap.get('key');

// myMap.size // => Object.keys(obj).length

// myMap.set(obj, ['']);














//? 00 - ще раз трохи про прототипне наслідування

const objPrototype = {
  logObjectId() {
    console.log(`Object ${this.name}'s ID is [${this.id}]`)
  },
  printName() {
    console.log(`Current name is [${this.name}]`)
  }
}

const objectA = {
  id: 21,
  name: 'A',
  __proto__: objPrototype
};

const objectB = {
  id: 42,
  name: 'B',
  __proto__: objPrototype
};

// objectA.logObjectId();
// objectB.logObjectId();

// objectA.printName();





class SimpleService {
  serviceUrl;

  constructor(url) {
    this.serviceUrl = url;
  }

  getData() {
    console.log(`SimpleService tries to get data from ${this.serviceUrl}...`);
  }
}

class SpecialService extends SimpleService {
  static test = 4;
  config = ['test-param'];

  getData() {
    console.log(`SpecialService tries to get data from [${this.serviceUrl}] with [${this.config}]...`);
  }
}

// const srv = new SpecialService('http://test-srv.com/v1/data');
// srv.getData();





























//? 00 - приклад на рекурсію і _this_ - based on real story
//* database content ------------------------------
const relatedData = [
  { id: 42, type: 'season', season_number: 1, related_series: 43 },
  { id: 43, type: 'series', title: 'Breaking Good', genres: ['comedy', 'sci-fi'] },
]

const relations = {
  episode: 'related_season',
  season: 'related_series'
}


//* дані які просто зараз вже у нас завантажені скриптом, і в процесі обробки
const dataInProcess = [
  { id: 1, type: 'movie', title: 'The Quest', genres: ['drama'] },
  { id: 2, type: 'episode', episode_number: 1, related_season: 42 }
]


//* -----------------------------------------------
// потрібно дістатись до поля _title_ - навіть якщо напряму тайтла немає
const meta = [];
const fieldToFind = 'title';

for (let i = 0; i < dataInProcess.length; i += 1) {
  const title = resolveField.call(dataInProcess[i], fieldToFind);
  meta.push(title);
}

//*-------------------------------------------
function resolveField(fieldName) {
  if (this[fieldName]) {
    return this[fieldName];
  }

  const linkToParent = relations[this.type]; // related_season

  //* тут ми йдемо в базу даних і знаходимо parent item по заданому ID
  const parentItem = relatedData.find((item) => item.id === this[linkToParent]);

  if (parentItem) {
    return resolveField.call(parentItem, fieldToFind);
  }

  return null;
}

//* запускаємо приклад
// console.log(meta);


























//? 00 - приклад на замикання і функції - based on real story
/*
  Отримуємо ззовні набір параметрів формату
  ["accountName=test-acc-name", "limit=10", "from=2022-03-01 02:15:00"]

  Всі параметри крім _accountName_ опціональні, можуть бути в будь-якому порядку в масиві

  Необхідно зробити:
  - валідацію параметрів (формат, тип...)
  - перевірку на обов'язкові параметри
  - перевірку на непідтримувані параметри
*/

// Параметри що обов'язково мають бути наявні
const mandatoryKeys = [ 'accountName' ];

/**
 * Список що поєднує функцію-валідатор і відповідний параметр.
 * Якщо параметра тут немає - то він НЕ ПІДТРИМУЄТЬСЯ (див. строку 409)
 *
 * @type {{[paramName: string]: Function }}
 */
const validators = {
  accountName: validateAccountName,
  limit: validateLimit
};

//* функції-валідатори -----------------------------------------------------

function validateAccountName(accountName = null) {
  if (!accountName?.length) {
    return '[accountName] cannot be empty';
  }

  return null; // null - помилки немає, валідні дані
}

function validateLimit(limit) {
  if (!parseInt(limit, 10) || limit.replace(/\d/g, '').length > 0) {
    return '[limit] must be a number';
  }

  return null; // null - помилки немає, валідні дані
}

//* основне рішення --------------------------------------------------------
const initContext = function (context = {}) {
  // тут відбуваються всякі дії на ініціалізацію об'єкта _context_
  if (!context.validationErrors) {
    context.validationErrors = [];
  }
  // ...
  // ...
  // повертається функція, що запам'ятовує свій контекст створення,
  // і у будь-який потрібний далі момент готова закінчити
  // ініціалізацію об'єкта _context_
  return function parseCommand(command = []) {
    command.forEach((arg) => {
      const [key, value] = arg.split('=');
      // debugger;

      // якщо параметра немає в списку з валідаторами - то він не підтримуваний
      if (!(key in validators)) {
        context.validationErrors.push(`Unsupported parameter: [${key}]`);
        return;
      }

      context[key] = value; // кожний розпізнаний параметр додається в _context_

      // якщо валідатор повернув помилку - додаємо в список
      const error = validators[key](value);
      if (error) {
        context.validationErrors.push(error);
      }
    });

    // перевірка обов'язкових параметрів
    mandatoryKeys.forEach((key) => {
      if (!(key in context)) {
        context.validationErrors.push(validators[key]());
      }
    });
  }
};

//* приклади використання
//* var 1
// const context1 = { existingKey: 'existing value'};
// let parseCommandForContext = initContext(context1);
// // проходить ряд інших дій, отримуємо _command_

// const command1 = ['accountName=test-acc-name', 'limit=10'];
// parseCommandForContext(command1);
// console.log(`valid command [${command1}]`, context1);

//* var 2
// const context2 = {};
// parseCommandForContext = initContext(context2);

// // проходить ряд інших дій, отримуємо _command_
// const command2 = ['accountName=test-acc-name'];
// parseCommandForContext(command2);
// console.log(`valid command [${command2}]`, context2);

//* var 3
// const context3 = { validationErrors: [] };
// parseCommandForContext = initContext(context3);

// // проходить ряд інших дій, отримуємо _command_
// const command3 = ['limit=10abc12', 'test=42', 'from=2022-08-05'];
// parseCommandForContext(command3);
// console.warn(`invalid command [${command3}]`, context3);










//? 00 - regexp
/*
  по регулярках рекомендую почитати:
  - https://www.programiz.com/javascript/regex
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

  оце класний онлайн-конструктор що допоможе побудувати і потестувати регулярку
  - https://regexr.com/
*/

'test-0101-hello'.replace(/a/g, ''); // замінить всі символи _a_ на пусту строку
'test-0101-hello'.replace(/\d/g, ''); // замінить всі числа (0 - 9) на пусту строку
// console.log('test-00101000-hello'.replace(/0{2,3}/g, ''));






















//? 00 - приклад на класи - based on real story
//* ми не розібрали, але як цікаво - спробуйте позапускати, подивіться як працює _this_

/*
  Існує три сервіси, які потрібно з різною періодичністю
  запитувати про оновлені дані.

  Є центральний storage, в який всі нові дані мають потрапити
*/

//! Рішення має бути легко розширюваним і змінюваним
const serviceA = {
  fetchTimeout: 60_000, // 1 min,
  params: {
    id: 'srv_A_cfg',
    /* data format A, request params, etc */
  },
};

const serviceB = {
  fetchTimeout: 10 * 60_000, // 10 min,
  params: {
    id: 'srv_B_cfg',
    /* data format A, request params, etc */
  },
};

const serviceC = {
  fetchTimeout: 30 * 60_000, // 30 min,
  params: {
    id: 'srv_C_cfg',
    /* data format C, request params, etc */
  },
};

//* рішення ----------------------------------------------------------------
class Service {
  constructor(serviceName, config) {
    this.name = serviceName;
    this.config = config;
  }

  fetchData() {
    console.log(`${this.name} fetching data...`);
    // дістає дані з сервіса
    // зберігає отримані дані в змінну _поточного_ інстанса
    const dataFromExternalAPI = {
      /* */
    }; // тут якісь отримані дані
    this.data = dataFromExternalAPI;
  }

  parseData() {
    console.log(`${this.name} uses [${this.config.params.id}] to parse data`);
    // форматуємо дані на основі конфіга із _this_
    const parsedData = this.data; // тут вже форматовані дані
    return parsedData;
  }

  // Загальний метод що стартує роботу сервіса по таймауту
  run() {
    console.log(`\n${this.name} starts!`);
    this.fetchData();
    const processedData = this.parseData();
    // тут нарешті запихуєм дані в глобальний storage
  }
}

class CustomService extends Service {
  // конструктор не пишемо, використовюється із parent

  parseData() {
    console.log(
      `${this.name} uses CUSTOM method and [${this.config.params.id}] to parse data`
    );
    // форматуємо дані на основі конфіга із _this_
    // згідно специфіки _serviceC_!
    return this.data; // повертаємо вже форматовані дані
  }
}

const services = [
  new Service('srv A', serviceA),
  new Service('srv B', serviceB),
  new CustomService('srv C', serviceC),
];

// services.forEach((service) => service.run());
























//? 00 - чи підключається youtube через js?..
//? приклад: https://www.berlin-for-ukraine.de/video-instructions/

/* <iframe
width="560"
height="315"
src="https://www.youtube.com/embed/88mg30RE0kw"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen
></iframe> */
// конструюємо _iframe_ вручну, динамічно:

const video = document.createElement('iframe');
const params = {
  type: 'video',
  width: "560",
  height: "315",
  src: 'https://www.youtube.com/embed/J46sRuj99Cw',
  title: "YouTube video player",
}

// додаємо параметри
Object.entries(params).forEach(([key, value]) => {
  video.setAttribute(key, value);
});

// додаємо сам елемент відео в сторінку
document.getElementById('youtube-root').insertAdjacentElement('afterbegin', video);

