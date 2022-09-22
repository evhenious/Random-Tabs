const storageKey = 'blogPosts';

/*
  Ми спеціально відокремили роботу з localStorage в окремий модуль,
  щоб сховати привязку до конкретного способу зберігання даних.

  В будь-який момент ми зможемо поміняти localStorage на, скажімо, postgreSQL
  і нам не доведеться міняти в зовнішньому коді майже нічого
*/

/**
 * Saves given data, replaces old data with the new
 * @param {Object|Object[]} dataToSave data we need to save
 */
function saveToStorage(dataToSave) {
  localStorage.setItem(storageKey, JSON.stringify(dataToSave));
}

/**
 * Returns all data from the storage
 * @returns {Object} parsed data from storage
 */
function getFromStorage() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey));
    return data;
  } catch (err) {
    console.warn('Cannot parse JSON from localStorage');
    return null;
  }
}

/**
 * Clears all the data in the storage
 */
function clearData() {
  localStorage.clear();
}

export { clearData, getFromStorage, saveToStorage };
