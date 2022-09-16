/**
 * Цей скрипт робить багато "складної роботи"
 * для того, щоб за необхідності трохи заблокувати нашу багатостраждальну сторінку в браузері
 */
function runHeavyWork() {
  console.warn('doing heavy things...');

  let i = 0;
  console.time('heavy-stuff');

  for (; /* no-op */ i < 4_000_000_000; i += 1) {
    /* no-op */
  }

  console.timeEnd('heavy-stuff');
  console.warn('finally done', i);

  return i;
}

const availableTasks = {
  'run-heavy-work': runHeavyWork,
};

onmessage = (event) => {
  // отримуєм дані з головного треда
  console.log('Worker thread:', event.data);
  const { command } = event.data;

  const task = availableTasks[command];
  if (!task) {
    console.log('Worker thread:', `Unknown task [${command}]`);
    postMessage({ command, result: 'Unknown command' });
    return;
  }

  const result = task();
  console.log('Worker thread:', `Task [${command}] finished.`);

  // повертаємо результат назад в головний тред
  postMessage({ command, result });
};
