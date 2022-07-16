import { initLesson } from './config.js';

initLesson('JS Lesson 01', 'Модуль 1. Заняття 1. Змінні, типи, оператори.');
//--------------------------------------------------------------------------------


// ## Example 1 - Базові математичні оператори

// Вивести на екран сумарну вартість товарів без знижок
// const apples = '47';
// const grapes = '135';
// const appleDiscount = 5;

// const totalNoDiscount = apples + grapes;
// console.log('totalNoDiscount', totalNoDiscount);

// Вартість яблук з урахуванням знижки?
// const applesWithDiscount = apples - appleDiscount;
// console.log({ applesWithDiscount, totalNoDiscount });




// ## Example 2 - Комбіновані оператори

// let students = 100;
// students = students + 50
// students += 50;

// students = students + 50
// students -= 50;

// students = students * 2
// students *= 2;

// console.log('students', students);




// ## Example 3 - Пріорітет операторів

// const result = 10 + 200 - (2 < 10) * 5;
// console.log({ result });




// ## Example 4 - Класс Math

// Написати скрипт, який буде виводити округлені вверх/вниз значення для
// змінної `value`. Math.floor(), Math.ceil(), Math.round()
// Що відбувається із значеннями 42.3, 42.5 і 42.9 ?

// const value1 = 42.3;
// const value2 = 42.5;
// const value3 = 42.9;

// console.log('Math.floor', 'Math.ceil', 'Math.round');
// console.log(Math.floor(value1), Math.ceil(value1), Math.round(value1));
// console.log(Math.floor(value2), Math.ceil(value2), Math.round(value2));
// console.log(Math.floor(value3), Math.ceil(value3), Math.round(value3));




// ## Example 5 - Шаблонні строки

// Вивести фразу `A has B bots in stock`, де A, B - надані змінні.

// const companyName = 'Cyberdyne Systems';
// const repairBots = 150;
// const defenceBots = 50;

// const totalBots = repairBots + defenceBots;
// const message = `${companyName} has ${totalBots} bots in stock`;
// console.log(message); // "Cyberdyne Systems has 200 bots in stock"




// ## Example 6 - Методи строк

// Написати скрипт що розрахує індекс маси тіла людини.
// Для цього потрібно: розділити вагу в кг на квадрат вистоти особи в метрах.

// Вага і зріст хранятся в змінних `weight` и `height`, але не як числа - строки.
// Дробні числа можуть бути задані у вигляді `xx.x` чи `xx,x` _(крапка vs кома)_

// Отримане значення необхідно округлити до десятих (до однієї цифри після коми)


// const weight = '88,3';
// const height = '1.75';

// replace()  ?  split()  ?  indexOf() + slice()  ?    ще варіанти позбутись коми?
// const weightFixed = weight.replace(',', '.');

// const bmi = weightFixed / Math.pow(height, 2);
// console.log('bmi', bmi.toFixed(1)); // 28.8



// ## Example 7 - Оператори порівняння, приведення типів

// Які будуть результати виразів?

// console.log('5 > 4', 5 > 4);
// console.log("10 >= '7'", 10 >= '7');
// console.log('');
// console.log("'2' > '12'", '2' > '12');
// console.log("'2' < '12'", '2' < '12');
// console.log("'4' == 4", '4' == 4);
// console.log("'6' === 6", '6' === 6);
// console.log('');
// console.log("'false' === false", 'false' === false);
// console.log('1 == true', 1 == true);
// console.log("1 === true", 1 === true);
// console.log("'0' == false", '0' == false);
// console.log("'0' === false", '0' === false);
// console.log('');
// console.log("'Papaya' < 'papaya'", 'Papaya' < 'papaya');
// console.log("'Papaya' === 'papaya'", 'Papaya' === 'papaya');
// console.log('');
// console.log('undefined == null', undefined == null);
// console.log('undefined === null', undefined === null);
// console.log('NaN == null', NaN == null);
// console.log('NaN === null', NaN === null);
// console.log('NaN == NaN', NaN == NaN);
// console.log('NaN === NaN', NaN === NaN);
// console.log('isNaN', Number.isNaN(NaN));




// ## Example 8 - Логічні оператори

// Який буде результат?

// console.log('true && 3', true && 3);
// console.log('false && 3', false && 3);
// console.log("true && 4 && 'kiwi'", true && 4 && 'kiwi');
// console.log("true && 0 && 'kiwi'", true && 0 && 'kiwi');
// console.log('true || 3', true || 3);
// console.log('true || 3 || 4', true || 3 || 4);
// console.log('true || false || 7', true || false || 7);
// console.log('null || 2 || undefined', null || 2 || undefined);
// console.log('(1 && null && 2) > 0', (1 && null && 2) > 0);
// console.log('null || (2 && 3) || 4', null || (2 && 3) || 4);






// ## Example 9 - Значення за замовчанням, нульове злиття

// Змінити код так, щоб в змінну `value` отримати значення із `incomingValue`,
// якщо воно НЕ `undefined` чи `null`.
// Інакше, там має опинитись значення із `defaultValue`.
// Перевірити на значеннях `incomingValue`: null, undefined, 0, false.
// Используй оператор `??` (nullish coalescing operator).

// const incomingValue = 0;
// const defaultValue = 10;

// const value = incomingValue ?? defaultValue;
// console.log({ value });



// ## Example 10 - Опертор % і методи строк

// Створити скрипт який переведе значення `totalMinutes` (кількість хвилин) в
// строку в форматі 'години:хвилини': `HH:MM`.

// - 70 покаже 01:10
// - 450 покаже 07:30
// - 1441 покаже 24:01

// const totalMinutes = 450;

// const hours = Math.floor(totalMinutes / 60);
// const minutes = totalMinutes % 60;
// 4 / 2 = 2
// console.log('4 / 3', 4 / 3)
// console.log('4 % 3', 4 % 3)

// console.log(hours);
// console.log(minutes);

// '123'.padStart(2, 0) => '123'
// '1'.padStart(2, 0) => '01'

// const doubleDigitHours = String(hours).padStart(2, 0);
// const doubleDigitMinutes = String(minutes).padStart(2, 0);

// console.log(`${doubleDigitHours}:${doubleDigitMinutes}`);
//
