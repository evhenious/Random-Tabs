import { initLesson } from './config.js';

initLesson('JS Lesson 10', 'Модуль 5. Заняття 10. Прототипи, класи, наслідування.');

//? ----------------------------------------------- питання з таблиці-----------------

//? ----------------------------------------------------------------------------------





















//? ## Example -1 - how do I debug? І навіщо це мені?
/*
  розберемо як працює дебагер на прикладі калькулятора і повільного менеджера
  з попереднього заняття
*/

// const calculator = {
//   arg1: null,
//   arg2: null,

//   read(a = 0, b = 0) {
//     this.arg1 = a;
//     this.arg2 = b;
//   },

//   add() {
//     console.log(this.arg1 + this.arg2);
//   }
// };


// const slowManager = {
//   name: 'Dolan',

//   doMath(calculator, ...numbers) {
//     debugger;
//     console.log(`Slow manager ${this.name} starts working...`);
//     calculator.read(...numbers);

//     // тут загубится контекст, тому що ми передаємо посилання на функцію, яка
//     // виконається через таймаут
//     // setTimeout( calculator.add, 3_000); // спрацює через 3 сек але ВТРАТИТЬ контекст

//     // v1 bind
//     // setTimeout( calculator.add.bind(calculator) , 3_000); // спрацює через 3 сек

//     // v2 arrow
//     setTimeout(() => calculator.add(), 3_000); // спрацює через 3 сек
//   }
// }

// приклад
// slowManager.doMath(calculator, 8, 2);


























//? ## Example 0 - прототипи і об'єкти, _isPrototypeOf_
/*
  Додати до об'єктів [user, dog] методи з об'єкта liveBeing
*/

// const entity = {
//   exists: true
// }

// const liveBeing = {
//   walk() {
//     console.log(`${this.name} goes for a walk!`);
//   },
//   sleep() {
//     console.log(`${this.name} falls asleep...`);
//   }
// };

// const user = {
//   name: 'Simon',
//   age: 25,
//   hobby: 'swimming'
// };

// const dog = {
//   name: 'Jerry',
//   age: 3,
//   breed: 'husky'
// };

// liveBeing.__proto__ = entity;

// user.__proto__ = liveBeing;
// dog.__proto__ = liveBeing;

// // user => [[prototype]] liveBeing => [[prototype]] entity

// console.log(`Is user exists? ${user.exists}`);

// console.log(liveBeing.isPrototypeOf(dog));
// console.log(entity.isPrototypeOf(dog));



// user.walk();
// dog.sleep();
// debugger;
























//? ## Example 1 - створення об'єктів з заданим прототипом
/*
  нам потрібні різні типи авто (спорткар, вантажівка...), у яких
  є деякі загальні властивості, але багато особливостей, в тому
  числі в поведінці (методи)
*/

// базовий об'єкт з властивостями для всіх авто
// const basicCar = {
//   wheels: 4,
//   doors: 4,
//   gear: 'manual',
//   drive() {
//     console.log(`${this.model || 'Basic car'} moves.`);
//   }
// };

// // v1 manual
// const newCar = Object.create(basicCar);
// newCar.doors = 2;
// newCar.model = 'Ferrari F50';
// newCar.drive();

// //v2 трохи покращене
// function makeSportCar() {
//   const newCar = Object.create(basicCar);
//   newCar.doors = 2;
//   newCar.model = 'Bugatti Veyron';
//   newCar.drive = function () {
//     console.log(`${this.model} moves super fast!`);
//   }

//   return newCar;
// }

// // v3 - v2+
// function makeSportCarWithParams(params = {}) {
//   const newCar = Object.create(basicCar);
//   const entries = Object.entries(params);
//   entries.forEach(([key, value]) => {
//     newCar[key] = value;
//   });

//   newCar.drive = function () {
//     console.log(`${this.model} moves super fast!`);
//   }

//   return newCar;
// }

// const superNewCar = makeSportCarWithParams({ name: 'new sport car', color: 'light-greeen' });





















//? ## Example 2 - класи, інстанси, static, _instanceof_
/*
  Переробити попередній приклад з авто на класи
*/

//* використаємо цей базовий об'єкт з властивостями для всіх авто:
// const basicCar = {
//   wheels: 4,
//   doors: 4,
//   gear: 'manual',

//   drive() {
//     console.log(`${this.model || 'Basic'} car moves.`);
//   }
// };

class Car {
  static gearboxTypes = ['auto', 'manual', 'robotic'];

  static setColor(car, color = 'black') {
    car.color = color;
  }

  wheels = 4;
  doors = 4;
  #gear = 'manual';

  constructor({ model, gearType = 'manual' }) {
    this.model = model;
    this.#gear = gearType;
  }

  drive() {
    console.log(`${this.model || 'Basic car'} with ${this.#gear} gearbox moves.`);
  }

  get gear() {
    return this.#gear;
  }

  set gear(type = 'manual') {
    // validation
    if (Car.gearboxTypes.includes(type)) {
      this.#gear = type;
    }
  }
}


class SuperCar extends Car {
  constructor(params) {
    super(params);

    this.gear = 'manual';
  }

  // drive() {
  //   console.log('This supercar drives super fast!');
  // }
}


const plainCar = new Car({ model: 'Ford Taurus' });
const plainCar1 = new Car({ model: 'Opel Cadett', gearType: 'auto' });

const newSportCar = new SuperCar({ model: 'Ford Mustang' });
// debugger;

newSportCar.drive();



























//? приклад майже із реального життя

/*
  Існує три сервіси, які потрібно з різною періодичністю
  запитувати про оновлені дані.

  Є storage, в який нові дані мають потрапити
*/

// const serviceA = {
//   fetchTimeout: 60_000, // 1 min,
//   config: { /* data format A, request params, etc */ }

// }

// const serviceB = {
//   fetchTimeout: 10 * 60_000, // 10 min,
//   config: { /* data format A, request params, etc */ }
// }

// const serviceC = {
//   fetchTimeout: 30 * 60_000, // 30 min,
//   config: { /* data format C, request params, etc */ }
// }








//? рішення
// class Service {
//   data = null;

//   constructor(name, config) {
//     this.name = name;
//     this.config = config;
//   }

//   async fetchData() {
//     console.log(`${this.name} fetching data...`);
//     // запрошує дані з сервіса по заданому таймауту
//     // зберігає отримані дані в змінну поточного інстанса
//     const dataFromExternalAPI = {} // якісь отримані дані
//     this.data = dataFromExternalAPI;
//   }

//   parseData() {
//     console.log(`${this.name} uses common way to parse data`);
//     // форматуємо дані на основі конфіга із _this_
//     return this.data // повертаємо вже форматовані дані
//   }

//   // єдиний метод що стартує роботу сервіса по таймауту
//   async run() {
//     console.log(`${this.name} starts!`);
//     await this.fetchData();
//     const processedData = this.parseData();
//     return processedData; // повертаємо дані в глобальний storage
//   }
// }

// class CustomService extends Service {
//   // конструктор не пишемо, використовюється із parent

//   parseData() {
//     console.log(`${this.name} uses CUSTOM way to parse data`);
//     // форматуємо дані на основі конфіга із _this_
//     // згідно специфіки serviceC!
//     return this.data // повертаємо вже форматовані дані
//   }
// }

// const services = [
//   new Service('srv A', serviceA),
//   new Service('srv B', serviceB),
//   new CustomService('srv C', serviceC),
// ]


// services.forEach((service) => service.run());
