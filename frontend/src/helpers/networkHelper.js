const baseUserApiAddress = 'http://jsonplaceholder.typicode.com';

/**
 * @param {string} userName
 * @returns {Promise<Object|null>} user data if user found, null otherwise
 */
function getAccountByName(userName) {
  return fetch(`${baseUserApiAddress}/users?username=${userName}`)
    .then((data) => data.json()) // дістаємо наші дані із респонса в форматі JSON
    .then((data = []) => {
      // якщо пошук юзера повернув пустий масив - кидаємо помилку "не знайдено"
      if (!data.length) {
        throw new Error(`User [${userName}] not found...`);
      }

      const [user = null] = data;
      return user;
    });
}

/**
 * @param {number} userId
 * @returns {Promise<Object[]>} posts of given user
 */
function getPostsForUser(userId) {
  return fetch(`${baseUserApiAddress}/users/${userId}/posts`).then((data) => data.json());
}

const jsonPlaceholderApi = {
  getAccountByName,
  getPostsForUser
};

/**
 * Fetches images page by page from Lorem Picsum
 *
 * @param {Object} params
 * @param {number} [params.limit] page size to request. Optional,
 *        required only for the first time, later will be autoincluded in page url
 * @param {string} [params.url] full next page url, including page index and limit
 *
 * @returns {Promise<{ picturesData: Object[], pageLinks: Object }>}
 */
function getImages({ limit, url }) {
  const dataUrl = url || `https://picsum.photos/v2/list?limit=${limit}`;

  return fetch(dataUrl)
    .then((response) => {
      // here, we get full URLs to prev and|or next pages from the backend in **link** header
      // <https://picsum.photos/v2/list?page=1&limit=10>; rel="prev", <https://picsum.photos/v2/list?page=3&limit=10>; rel="next"
      const pageLinks = parseNavDirections(response.headers.get('link'));
      return response.json().then((data) => ({ data, pageLinks }));
    })
    .then(({ data, pageLinks }) => {
      const picturesData = data.map(transformImageUrls);

      return { picturesData, pageLinks };
    });
}

/**
 * Parses link header to separate navigation links
 * @param {string} links
 * @returns {{ prev?: string, next?: string }}
 */
function parseNavDirections(links) {
  const linksArray = links.split(',');
  const pageLinks = {};
  /*
    Each link contains URL and direction type (prev or next):
    <https://picsum.photos/v2/list?page=1&limit=10>; rel="prev"
    <https://picsum.photos/v2/list?page=3&limit=10>; rel="next"
  */
  linksArray.forEach((link) => {
    // we need to find and cut out DIRECTION (prev | next)
    const dirStart = link.indexOf('"') + 1;
    const dirEnd = link.lastIndexOf('"');
    const direction = link.slice(dirStart, dirEnd);

    // and we need to cut out URL of that direction
    const urlStart = link.indexOf('<') + 1;
    const urlEnd = link.indexOf('>');
    const url = link.slice(urlStart, urlEnd);

    pageLinks[direction] = url;
  });

  return pageLinks;
}

/**
 * Transforms image object returned from Lorem Picsum to the format our Gallery expects
 *
 * @param {Object} img
 * @returns {{ original: string, preview: string }}
 */
function transformImageUrls(img) {
  // here, we use regex to replace original image resolution and create small preview
  // https://picsum.photos/id/0/ 5616/3744 => https://picsum.photos/id/0/ 330/330
  const preview = img.download_url.replace(/\d{1,4}\/\d{1,4}$/, '330/330');

  return {
    original: img.download_url,
    preview,
  };
}

const userApiBase = 'http://localhost:4321/api/users';
const headers = new Headers();
headers.set('content-type', 'application/json');

/**
 * Get list of all users
 * @returns {Promise<Object[]>}
 */
function getUsersList() {
  return fetch(userApiBase).then((resp) => resp.json());
}

/**
 * Deletes user
 * @param {number|string} userId
 * @returns {Promise}
 */
function deleteUser(userId) {
  return fetch(`${userApiBase}/${userId}`, {
    method: 'DELETE',
  });
}

/**
 * Creates new user
 * @param {Object} userData
 * @returns {Promise}
 */
function createUser(userData = {}) {
  return fetch(userApiBase, {
    method: 'POST',
    headers,
    body: JSON.stringify(userData),
  }).then((resp) => resp.json());
}

/**
 * Get a user by user id
 * @param {string|number} userId
 * @returns {Promise<Object>}
 */
function getUserById(userId) {
  return fetch(`${userApiBase}/${userId}`).then((resp) => resp.json());
}

/**
 *
 * Updates existing user info
 * @param {number|string} userId
 * @param {Object} userData
 * @returns {Promise}
 */
function updateUser(userId, userData) {
  return fetch(`${userApiBase}/${userId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(userData),
  });
}

/**
 * Central exported point for user api functionality
 */
const userApi = {
  getUsersList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export { jsonPlaceholderApi, getImages, userApi };
