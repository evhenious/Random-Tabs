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

function runHeavyWorkV2() {
  console.warn('doing heavy things...');

  let i = 0;
  console.time('heavy-stuff');
  const partSize = 5_000_000;

  const runPart = () => {
    let localCounter = i;
    for (/* no-op */; localCounter < i + partSize; localCounter += 1) {
      /* no-op */
    }
    i = localCounter;

    if (i < 4_000_000_000) {
      // Promise.resolve().then(runPart); // не розблоковує
      setTimeout(runPart, 0);
    } else {
      console.timeEnd('heavy-stuff');
      console.warn('finally done', i);
    }
  };

  runPart();
}

export {
  runHeavyWork,
  runHeavyWorkV2
};
