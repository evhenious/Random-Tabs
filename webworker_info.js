// Web worker - окрема сутність з власним незалежним івент лупом і глобалами. В ньому можна робити будь-які важкі речі,
// і це не буде блокувати основний івент луп, рендерінг, і так далі.
// Web worker не має доступу до html, єдиний спосіб взаємодії з ним - відправка команд через _postMessage_
// і отримання відповідей через _onmessage_

// Створюємо воркер на базі окремого файла - не на базі простого імпорта функції!
const worker = new Worker('./worker.js', { type: 'module' });

// можна відправляти будь-які дані - строки, об'єкти... вони будуть склоновані і копії передані в воркер
console.log('Main thread:', 'Asking worker to run a few tasks');

worker.postMessage({ command: 'run-heavy-work' });
worker.postMessage({ command: 'do-a-barrel' });

// один івент хендлер на всі мессаджі
worker.onmessage = (event) => {
  // отримуєм відповідь з воркера
  console.log('Main thread:', event.data);
}

console.log('Main thread:', 'End');