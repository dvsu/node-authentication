const MOCK_STORAGE = require("../store/mock_storage");
const User = require("../models/user");
const SigninUser = require("../models/signin_user");

/**
 * write new user data to database.
 * In this example, a delay is introduced
 * to simulate the actual DB write
 * @param {User} user
 */
exports.signup = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      // assuming this process is successful and
      // the error value is null
      const err = null;

      if (err) {
        reject(err);
        return;
      }

      // check if user exists
      const isExist =
        MOCK_STORAGE.filter(
          (registeredUser) => registeredUser.email === user.email
        ).length > 0;

      if (isExist) {
        reject({
          message: "User does exist",
        });
        return;
      }
      await user.hashPassword();
      MOCK_STORAGE.push(user);
      resolve();
    }, 2000);
  });
};

/**
 * query specific user data from database.
 * In this example, a delay is introduced
 * to simulate the actual DB query
 * @param {SigninUser} user
 */
exports.signin = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      // assuming this process is successful and
      // the error value is null
      const err = null;

      if (err) {
        reject(err);
        return;
      }

      const userData = MOCK_STORAGE.filter(
        (registeredUser) => registeredUser.email === user.email
      );

      if (userData.length === 0) {
        reject({
          message: "User does not exist",
        });
        return;
      }

      const result = await user.passwordIsValid(userData[0].password);

      if (!result) {
        reject({
          message: "'password' is incorrect",
        });
        return;
      }

      // ideally returns access token, refresh token
      resolve();
    }, 2000);
  });
};
