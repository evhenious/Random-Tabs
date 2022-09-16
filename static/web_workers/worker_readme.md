Web worker - окрема сутність з власним незалежним івент лупом і глобалами. В ньому можна робити будь-які важкі речі,
і це не буде блокувати основний івент луп, рендерінг, і так далі.
Web worker не має доступу до html, єдиний спосіб взаємодії з ним - відправка команд через _postMessage_ і отримання відповідей через _onmessage_

1. Створюємо воркер на базі окремого файла - не на базі простого імпорта функції!
```js
// якщо дев-сервер запускається через _esbuild_
const worker = new Worker(`${location.origin}/worker.js`, { type: 'module' });

// якщо користуємось варіантом з _parcel_
const worker = new Worker(new URL('./web_workers/worker.js', import.meta.url), { type: 'module' });
```

2. Можна відправляти будь-які дані - строки, об'єкти... вони будуть склоновані і копії передані в воркер.
Цей тестовий веб воркер стартує разом з проектом, і готовий приймати тестові команди із **основного джаваскріпта сторінки** -
скопіюйте код нижче кудись в кінець **index.js** (для зручності) і спостерігайте за результатом
```js
console.log('Main thread:', 'Asking worker to run a few tasks');

worker.postMessage({ command: 'run-heavy-work' });
worker.postMessage({ command: 'do-a-barrel' });

// один івент хендлер на всі мессаджі
worker.onmessage = (event) => {
  // отримуєм відповідь з воркера
  console.log('Main thread:', event.data);
};

console.log('Main thread:', 'End');
```