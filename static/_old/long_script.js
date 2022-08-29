console.warn('doing heavy things...');

let i = 0;
console.time();
for (/* no-op */; i < 2_000_000_000; i += 1) {
  /* no-op */
}

/*
Цей скрипт робить багато "складної роботи" - приблизно 10 секунд,
для того, щоб за необхідності трохи
заблокувати нашу багатостраждальну сторінку в браузері
*/

console.timeEnd();
console.warn('finally done', i);

console.log('#lesson-title:', document.getElementById('lesson-title'));
