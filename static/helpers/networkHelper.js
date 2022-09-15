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

/**
 * @param {URLSearchParams} params
 * @returns {Promise<Object[]>}
 */
function getImages(params) {
  return fetch(`https://picsum.photos/v2/list?${params}`)
    .then((response) => response.json())
    .then((data) => {
      const processedData = data.map((img) => {
        //? https://picsum.photos/id/0/ 5616/3744 => https://picsum.photos/id/0/ 330/330
        const preview = img.download_url.replace(/\d{1,4}\/\d{1,4}$/, '330/330');

        return {
          original: img.download_url,
          preview
        };
      });

      return processedData;
    });
}

export { getUserByName, getPostsForUser, getImages };
