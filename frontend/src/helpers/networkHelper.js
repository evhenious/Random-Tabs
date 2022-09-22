import axios from "axios";
import { parseNavDirections, transformImageUrls } from "./galleryHelper.js";

const baseUserApiAddress = 'http://jsonplaceholder.typicode.com';

/**
 * @param {string} userName
 * @returns {Promise<Object|null>} user data if user found, null otherwise
 * Uses native **fetch()** as example
 */
async function getAccountByName(userName) {
  const resp = await fetch(`${baseUserApiAddress}/users?username=${userName}`);
  const data = await resp.json();

  if (!data.length) {
    throw new Error(`User [${userName}] not found...`);
  }

  const [user = null] = data;
  return user;
}

/**
 * Gets some test data from JsonPlaceholder. Uses native **fetch()**
 * @param {number} userId
 * @returns {Promise<Object[]>} posts of given user
 */
async function getPostsForUser(userId) {
  const resp = await fetch(`${baseUserApiAddress}/users/${userId}/posts`);
  return resp.json();
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
async function getImages({ limit, url }) {
  const dataUrl = url || `https://picsum.photos/v2/list?limit=${limit}`;
  const { data, headers } = await axios.get(dataUrl);

  const pageLinks = parseNavDirections(headers['link']);
  const picturesData = data.map(transformImageUrls);

  return { picturesData, pageLinks };
}

const apiInstance = axios.create({
  baseURL: 'http://localhost:4321/api'
});

/**
 * Get list of all users
 * @returns {Promise<Object[]>}
 */
async function getUsersList() {
  const { data } = await apiInstance.get('/users');
  return data;
}

/**
 * Deletes user
 * @param {number|string} userId
 * @returns {Promise}
 */
function deleteUser(userId) {
  return apiInstance.delete(`/users/${userId}`);
}

/**
 * Creates new user
 * @param {Object} userData
 * @returns {Promise}
 */
async function createUser(userData = {}) {
  const { data } = await apiInstance.post('/users', userData);
  return data;
}

/**
 * Get a user by user id
 * @param {string|number} userId
 * @returns {Promise<Object>}
 */
async function getUserById(userId) {
  const { data } = await apiInstance.get(`/users/${userId}`);
  return data;
}

/**
 *
 * Updates existing user info
 * @param {number|string} userId
 * @param {Object} userData
 * @returns {Promise}
 */
function updateUser(userId, userData) {
  return apiInstance.patch(`/users/${userId}`, userData);
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
