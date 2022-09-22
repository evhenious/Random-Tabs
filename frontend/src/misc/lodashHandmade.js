/**
 * Creates a throttled function that only invokes _throttledFunc_ at most once per every _timeout_ milliseconds
 *
 * @param {Function} throttledFunc
 * @param {number} timeout
 *
 * @returns {Function}
 */
function throttle(throttledFunc, timeout) {
  let isTriggerAllowed = true;
  let lastTriggeredCall = null;

  setInterval(() => {
    if (lastTriggeredCall) {
      lastTriggeredCall();
    }

    isTriggerAllowed = true;
  }, timeout);

  return (...args) => {
    if (isTriggerAllowed) {
      isTriggerAllowed = false;
      lastTriggeredCall = null;
      throttledFunc(...args);
    } else {
      lastTriggeredCall = () => throttledFunc(...args);
    }
  };
}

/**
 * Creates a debounced function that delays invoking _debouncedFunc_ until after _timeout_ milliseconds
 * have elapsed since the last time the debounced function was invoked
 *
 * @param {Function} debouncedFunc
 * @param {number} timeout
 *
 * @returns {Function}
 */
function debounce(debouncedFunc, timeout) {
  let timerRef = 0;

  return (...args) => {
    clearTimeout(timerRef);

    timerRef = setTimeout(() => {
      debouncedFunc(...args);
    }, timeout);
  };
}

export { debounce, throttle };
