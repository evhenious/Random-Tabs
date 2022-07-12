const CONSOLE_TITLE_STYLES = [
  'color:darkorange',
  'font-size: 14px;',
  'text-decoration: underline;'
].join(';');

document.getElementById('lesson-title').innerText = 'JS Lesson 03';
console.log('# %c Модуль 2. Заняття 3. Масиви. Методи масивів.', CONSOLE_TITLE_STYLES);



//? ----------------------------------------------- питання з таблиці-----------------


//?
// Підкажіть, будь-ласка, чому так працює:
// const number = [1, 2, 3, 4, 5,]; number.splice(5,0,6); console.log(number);
// А так ні:
// const number = [1, 2, 3, 4, 5,]; console.log(number.splice(5, 0, 6));

// const numbersA = [1, 2, 3, 4, 5];
// numbersA.splice(5, 0, 6);
// console.log('option A', numbersA);

// const numbersB = [1, 2, 3, 4, 5];
// console.log('option B - splice result', numbersB.splice(5, 0, 6));
// console.log('option B - numbersB itself', numbersB);






//? ----- FOR-IN vs FOR-OF
// const items = ['guitar', 'violin'];
// items.haveStrings = true;

// console.warn('array + for-OF');
// for (const item of items) {
//   console.log(`'${item}' is available in for-OF`);
// }

// console.warn('array + for-IN');
// for (const key in items) {
//   console.log(`'${key}' is available in for-IN`);
// }

// console.warn('string + for-OF');
// for (const item of 'hello') {
//   console.log(`'${item}' is available in for-IN`);
// }

// console.warn('Object + for-OF');
// for (const item of { id: 42 }) {
//   console.log(`'${item}' is available in for-IN`);
// }


// const myArray = [42, true, 'i_am_the_lord', 1111];



//? ----------------------------------------------------------------------------------






//? ## Example 1 - Базові операції з масивом

// 1. Створити масив з елементами 'Jazz' и 'Blues'
// const genres = ['Jazz', 'Blues'];

// // 2. Додати 'Rock' в кінець масиву.
// genres.push('Rock');

// // 3. Вивести в консоль перший елемент масива (не видаляючи його)
// console.log('перший елемент', genres[0]);

// // 4. Вивести в консоль останній элемент масива. Має працювати для будь-якої довжини.
// //  genres.length
// const lastElementIndex = genres.length - 1;
// console.log('останній елемент', genres[lastElementIndex]);

// // 5. Видалити з масиву перший елемент і вивести в консоль.
// const firstElement = genres.shift();
// console.log('firstElement', firstElement);

// // 6. Додати «Country» і «Reggy» в початок масиву (зберегти порядок).
// genres.unshift('Country', 'Reggy');
// console.log({ genres });











//? ## Example 2 - Масиви і строки
/*
Написати скрипт для обчислення площі прямокутника зі сторонами, довжину яких
отримуємо у змінній `sides` у вигляді строки.
Значення гарантовано розділені одним пробілом
*/

// const sides = '7 10';
// const sidesSeparated = sides.split(' ');

// const area = sidesSeparated[0] * sidesSeparated[1];
// console.log({ sidesSeparated, area });








//? ## Example 3 - Перебор масивів, умови
/*
Написати скрипт для перебору масива `fruits` циклом `for`.
Для кожного элементу вивести в консоль строку формата `номер_елемента: значення_элемента`.
Нумерациія має починатись з `1`.
*/

// const fruits = ['🍎', '🍇', '🍑', '🍌', '🍋'];
// const fruitsToIgnore = ['🍌', '🍋'];

// for (let i = 0; i < fruits.length; i++) {
//   const item = fruits[i];
//   if (fruitsToIgnore.includes(item)) {
//     continue;
//   }

//   console.log(`${i + 1}: ${item}`);
// }


// v2 - next lessons :)
// const filtered = fruits.filter((item) => !fruitsToIgnore.includes(item));
// console.log(filtered);











//? ## Example 4 - Масиви і цикли
/*
Написати скрипт що виводить в консоль ім'я і телефон користувачів.
У змінних `names` і `phones` зберігаються строки імен і телефонних номерів,
розділені комами.
Порядок імен відповідає порядку номерів.
Кількість імен и телефонів гарантовано однакова.
  - Обрати зручний формат
*/

// const names = 'Jacob,William,Solomon,Nicolas';
// const phones = '89001234567,89001112233,890055566377,890055566300';

// const splitNames = names.split(',');
// const splitPhones = phones.split(',');

// for (let i = 0; i < splitNames.length; i++) {
//   const name = splitNames[i];
//   const phone = splitPhones[i];

//   console.log(`Name: ${name}, phone: ${phone}`);
// }


//  real life case:
// const users = [ { name: 'Jacob', phone: '32265588'} ];










// ? Масиви і строки

//? ## Example 5
/*
Написати скрипт що виводить в консоль задану фразу без першого і останнього слів.
Фінальна строка не має починатись чи закінчуватись пробілом.
Скрипт має працювати для будь-якої строки.
*/

// const phrase = 'Welcome to the bright future';

// const words = phrase.split(' ');
// words.pop();
// words.shift();

// const cutPhrase = words.join(' ');
// console.log({ cutPhrase });


// v2 slice
// const firstSpace = phrase.indexOf(' ');
// const lastSpace = phrase.lastIndexOf(' ');

// const cutPhrase = phrase.slice(firstSpace + 1, lastSpace);
// console.log({ cutPhrase });







//? ## Example 6
/*
Написати скрипт який «розверне» строку (зворотній порядок літер) і виведе в консоль.
Три варіанти - цикл for (без масивів), цикл for-of + масиви, без циклів?
*/

// const phrase = 'Welcome to the future';

// v1 - for
// let reversed = '';

// for(let i = phrase.length-1; i >= 0; i--) {
//   const item = phrase.charAt(i);
//   // console.log('char', item);

//   reversed += item;
// }


// v2 - for-of
// const chars = phrase.split('');
// console.log(chars);

// const reversedArray = [];

// for (const item of chars) {
//   reversedArray.unshift(item);
// }

// const reversed = reversedArray.join('');

// console.log('reversed:', reversed);


// v3 - reverse!
// const chars = phrase.split('');
// const reversed = chars.reverse().join('');

// console.log('reversed:', reversed);





//? ## Example 7 - Пошук елемента
/*
Написати скрипт пошуку найменшого числа в массиве. Чи є варіанти?
*/

// const numbers = [2, 17, 94, 1, 23, 37];

// // v1 - Math
// // let min = Math.min(...numbers); // Math.min(2, 17, 94.....)

// // v2 - for-of
// let min = numbers[0];
// for (const number of numbers) {
//   // if (number < min) {
//   //   min = number;
//   // }

//   // min = number < min ? number : min;

//   min = Math.min(number, min);
// }


// console.log(`min is ${min}`, numbers); // має вивести 1












//? ## Example 8 - Сортування масива с циклом
/*
Написати скрипт сортування масиву строк в алфавітному порядку.
*/

const langs = ['python', 'javascript', 'c++', 'haskel', 'php', 'ruby', 'ada'];
let isSorted;

do {
  console.log('-------- next iteration WHILE');
  isSorted = true; // приймемо, що масив ПОТЕНЦІЙНО сортований

  // але ми не можемо гарантувати це, тому
  // все одно маємо пробігтись хоч один раз по ньому і перевірити:
  for (let i = 0; i < langs.length - 1; i++) {
    console.log(langs);

    const current = langs[i];
    const next = langs[i + 1];

    const isNotSorted = current > next;
    console.log(`comparing: ${current} > ${next}`, isNotSorted);

    // порівняння строк - по порядку символа в таблиці юнікода (по алфавіту, здебільшого)
    if (isNotSorted) {
      console.log('swapping!');
      langs[i] = next;
      langs[i + 1] = current;

      // якщо ми щось міняли - ставимо мітку, бо немає гарантій що масив ЗАРАЗ вже повністю сортований
      // і тому нам знадобиться ще хочаб один прогін do-while, щоб перевірити чи все ОК тепер
      isSorted = false;
    }
  }

} while (!isSorted); // якщо isSorted в кінці цикла WHILE залишається TRUE - масив відсортовано, цикл завершується

console.log('SORTED!', langs);









