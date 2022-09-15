const baseUserApiAddress = 'http://jsonplaceholder.typicode.com';

/**
 * @param {string} userName
 * @returns {Promise<Object>} user data if user found
 */
function getUserByName(userName) {
  return fetch(`${baseUserApiAddress}/users?username=${userName}`)
    .then((data) => data.json()) // дістаємо наші дані із респонса в форматі JSON
    .then((data = []) => {
      // якщо пошук юзера повернув пустий масив - кидаємо помилку "не знайдено"
      if (!data.length) {
        throw new Error(`User [${userName}] not found...`);
      }

      const [user] = data;
      return user;
    });
}

/**
 * @param {number} userId
 * @returns {Promise<Object[]>} posts of given user
 */
function getPostsForUser(userId) {
  return fetch(`${baseUserApiAddress}/users/${userId}/posts`)
    .then((data) => data.json());
}

export { getUserByName, getPostsForUser };
