/**
 * Цей скрипт робить багато "складної роботи"
 * для того, щоб за необхідності трохи заблокувати нашу багатостраждальну сторінку в браузері
 *
 */
function runHeavyWork() {
  console.warn('doing heavy things...');

  let i = 0;
  console.time('heavy-stuff');

  for (/* no-op */; i < 4_000_000_000; i += 1) {
    /* no-op */
  }

  console.timeEnd('heavy-stuff');
  console.warn('finally done', i);
}

export { runHeavyWork };
