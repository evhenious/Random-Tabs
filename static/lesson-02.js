document.getElementById('lesson-title').innerText = 'JS Lesson 02';
console.log('# Модуль 1. Заняття 2. Розгалудження. Цикли. Область видимості змінних');



// ----------------------------------------------- питання з таблиці
// Чи можемо ми якось переписувати те що всередині const
// const employees = 2;
// let totalSalary = 0;
// const minSalary = 500;
// const maxSalary = 5000;

// for (let i = 1; i <= employees; i += 1) {
//   const salary = Math.round(
//     Math.random() * (maxSalary - minSalary) + minSalary
//     // minSalary + (range) * Math.random()
//   );
//   console.log(`Salary ${i} - ${salary}`);
//   totalSalary = totalSalary + salary;
// }

// console.log('totalSalary', totalSalary);




// Питання по   total+=i  - чому значенням total буде сума всіх i а не лише 1го,
// останнього наприклад?  тобто цикл for автоматично додає
// всі i з усіх ітерацій?
// const min = 0;
// const max = 7;
// let total = 0;

// for (let i = min; i < max; i += 1) {
//   if (i % 2 !== 0) {
//     console.log('Непарне число:', i);
//     continue;
//   }

//   console.log('Парне число:', i);
//   total += i; // 0 + 2 + 4 + 6
// }

// console.log('total', total);





// Чому так не працює?
// for (let i = 0; i < 10; i += 1) {
//   if (i % 2 === 0) { // парні
//     console.log('парне i: ', i);
//     continue;
//   }

//   console.log('Непарне i: ', i); // 1, 3, 5, 7, 9
// }





// чому 6 ?

// const target = 3;
// let sum = 0;

// for (let i = 0; i <= 3; i += 1) {
//   console.log('before', i, sum);
//   sum += i;
//   console.log('after', i, sum);
// }

// console.log(sum);

// ----------------------------------------------------------------------------------














//! VAR vs LET+CONST
// myVar = 0;
// let myLet = 0;
// console.log(`initial: myVar ${myVar}, myLet ${myLet}`);
// // console.log('initial: myConst', myConst); // ?

// if (true) {
//   var myVar = 1;
//   let myLet = 1;
//   const myConst = 42;
//   console.log(`inside IF: myVar ${myVar}, myLet ${myLet}, myConst: ${myConst}`);
// }

// console.log(`outside IF: myVar ${myVar}, myLet ${myLet}`);
// console.log('outside IF: myConst', myConst); // ?







//! WHAT IS GOING ON HERE????
// for (let i = 0; i < 5; i = +1) {
//   console.log(i)
// }









// ## Example 1 - Запрос даних від користувача. if-else

// Написати код який запитає у користувача: 'Який ваш улюблений фільм Тарантіно?'
// Якщо відповідь "Pulp Fiction" - показати текст 'Вітаю фанатів класики!',
//  інакше - 'Передивіться Pulp Fiction!'
// Використайте prompt, alert
// Бажано щоб введена строка перевірялась незалежно від регістра літер(case-insensitive)

//
// const movieName = prompt('Який ваш улюблений фільм Тарантіно?');
// if (movieName.toLowerCase() === 'Pulp Fiction'.toLowerCase()) {
//   alert('Вітаю фанатів класики!');
// } else {
//   alert('Передивіться Pulp Fiction!');
// }

// default alert
// let response = 'Передивіться Pulp Fiction!';
// if (movieName.toLowerCase() === 'Pulp Fiction'.toLowerCase()) {
//   response = 'Вітаю фанатів класики!';
// }
// alert(response);

// ternary
// let response = movieName.toLowerCase() === 'Pulp Fiction'.toLowerCase()
//     ? 'Вітаю фанатів класики!'
//     : 'Передивіться Pulp Fiction!'






// ## Example 2 - prompt, alert, console, вкладені if-else

// Написати код, що буде пропонувати користувачу залогінитись на сайт (prompt):

// - Якщо користувач пише `admin`, запитати пароль
//   - Якщо нічого не введено, чи користувач закриває prompt - вивести в консоль строку 'Скасування входу'
// - Для всіх інших логінів показати користувачу alert з текстом 'Такий користувач не існує'

// Пароль для admin перевірити так:
// - Якщо введено '12345', вивести в консоль 'Адмін зайшов успішно'
// - В інших випадках показати alert 'Невірний пароль'



// const userName = prompt('введіть юзернейм )');
// if (userName === 'admin') {
//   const password = prompt('і ще пароль');
//   if (!password) {
//     console.log('Скасування входу');
//   } else {
//     // only if password exists
//     if (password === '12345') {
//       console.log('Адмін зайшов успішно')
//     } else {
//       alert('Невірний пароль');
//     }
//   }
// } else {
//   alert('Такий користувач не існує');
// }








// ## Example 3 -Виведення часу в консоль (if...else)

// Створити скрипт для виведеня годин і хвилин в консолі у форматі строки: `14 ч. 26 мин.`
// Якщо значення в змінній `minutes` дорівнює `0`, то виводити строку `14 ч.`, без хвилин.

// const hours = 14;
// const minutes = 0;

// let timestring = !minutes ? `${hours} ч.` : `${hours} ч. ${minutes} мин.`;
// let anotherTs = `${hours} hrs. ${!minutes ? '' : minutes+' min.'}`;

// // if-else
// timestring = `${hours} ч.`;
// if (minutes) {
//   timestring += `${minutes} мин.`;
// }

// console.log('timestring', timestring);









// ## Example 4 - Розгалудження vs тернарний оператор?

// Скрипт має виводити в консоль 'Positive number' якщо користувач ввів число більше нуля.
// Якщо введений нуль, вивести в консоль 'Zero!'.
// На вводі значення менше нуля в консолі має бути 'Negative number'.
// Запитати тричі в циклі, спростити за можливості


// const userInput = prompt('Введіть число');
// if (userInput < 0) {
//   console.log('Negative number');
// } else if (userInput > 0) {
//   console.log('Positive number')
// } else {
//   console.log('Zero!')
// }

//
// for (let i = 0; i < 3; i++) {
//   const userInput = prompt('Введіть число');

//   if (userInput < 0) {
//     console.log('Negative number');
//     continue;
//   }

//   if (userInput > 0) {
//     console.log('Positive number');
//     continue;
//   }

//   console.log('Zero!');
// }











// ## Example 5 - Форматування посилання (endsWith)

// Написати скрипт що перевіряє чи закінчується значення змінної `link` символом `/`.
// Якщо ні, то додати цей символ в кінець `link`


// let link = 'https://my-site.com/about';

// if (!link.endsWith('/')) {
//   link += '/';
// }

// if (link.charAt(link.length - 1) === '/') {
// // ...
// }

// console.log('link', link);











// ## Example 6 - Форматування посилання (includes + логічне &&)

// Написати скрипт що перевіряє чи закінчується значення змінної `link` символом `/`.
// Якщо ні - додати, але тільки у випадку коли в значенні змінної є підстрока `"my-site"`.


// let link = 'https://my-site.com/about';
// if (!link.endsWith('/') && link.includes('my-site')) {
//   link += '/';
// }

// //
// let isEndsWithSlash = !link.endsWith('/');
// let includesMySide = link.includes('my-site');
// if (isEndsWithSlash && includesMySide) {}

// console.log('link', link);






// ## Example 7 - Форматирование ссылки (тернарный оператор)

// Рефакторінг кода із задачі #6 за допомогою тернарки

// let link = 'https://my-site.com/about';
// if (!link.endsWith('/') && link.includes('my-site')) {
//   link += '/';
// }


// link += !link.endsWith('/') && link.includes('my-site') ? '/' : '';

// console.log('link', link);









// ## Example 8 - if...else + AND , OR

// Скрипт має виводити в консоль строку в залежності від значення змінної `hours`.

// Якщо `hours`:
// - менше 17, вивести строку `Pending`
// - в проміжку від 17 до 24 (включно), вивести строку з попередженням `Expires soon`
// - більше `24` , вивести строку з помилкою `Expired`
// 'qwer', "tyu", `uiop`

// const hours = -30;

// if (hours < 17) {
//   console.log('Pending');
// } else if (hours >= 17 && hours <= 24) {
//   console.warn('Expires soon');
// } else {
//   console.error(`Expired`);
// }









// ## Example 9 - Страшне слово Дедлайн! (if...else  vs switch)

// Скрипт що визначає поточний стан проекта і інформує щодо дати дедлайну.
// Написати з використанням `if...else`.

// - Якщо до дедлайна 0 днів - виведи строку `Deadline is TODAY`
// - Якщо до дедлайна 1 день - виведи строку `Deadline is tomorrow`
// - Якщо до дедлайна 2 дні - виведи строку `2 days before deadline`
// - Якщо до дедлайна 3+ дні - виведи строку `Relax, deadline is not there`

// OK

// Відрефакторити код із задачі на switch
// const daysTillDeadline = 10;

// switch (daysTillDeadline) {
//   case 0:
//     console.error('Deadline is TODAY');
//     break;
//   case 1:
//     console.warn('Deadline is tomorrow');
//     break;
//   case 2:
//     console.log('2 days before deadline');
//     break;

//   default:
//     console.log('Relax, deadline is not there');
//     break;
// }








// ## Example 10 - Цикл for

// Вивести в консоль числа по порядку від min до max, але тільки якщо число кратне 5.


// const min = 20;
// const max = 100;

// for (let index = min; index <= max; index++) {
//   if (index % 5 === 0) {
//     console.log(index);
//   }
// }

// // for (let index = min; index <= max; index += 5) {}

// const user = {
//   name: 'admin',
//   pass: '12345'
// }

// const users = [];

// const name = 'admin';