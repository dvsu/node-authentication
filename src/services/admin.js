const MOCK_STORAGE = require("../store/mock_storage");
const User = require("../models/user");

/**
 * Assuming it takes time to pull data from database
 * @returns {Promise<Array<User>?>}
 */
exports.listUsers = async () => {
  return new Promise((resolve, reject) => {
    // here we simulate the delay of database query
    setTimeout(() => {
      // assume the query callback has
      // 'err' parameter where we can check
      // whether error is happening
      const err = null;

      if (err) {
        reject(err);
        return;
      }
      const result = MOCK_STORAGE.map((user) => {
        const { password, ...userData } = user;
        return userData;
      });
      resolve(result);
    }, 1500);
  });
};

/**
 *
 * @param {String} id
 * @returns
 */
exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    // here we simulate the delay of database query
    setTimeout(() => {
      // assume the query callback has
      // 'err' parameter where we can check
      // whether error is happening
      const err = null;

      if (err) {
        reject(err);
        return;
      }
      const result = MOCK_STORAGE.filter((user) => user.id === id).map(
        (user) => {
          const { password, ...userData } = user;
          return userData;
        }
      );
      resolve(result);
    }, 1500);
  });
};
