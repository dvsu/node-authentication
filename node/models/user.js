const { randomizer } = require("crypto");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = class User {
  #saltRounds = 10;

  constructor(name, email) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
  }

  setPassword(password, callback) {
    bcrypt.hash(password, this.#saltRounds, (err, hash) => {
      this.hash = hash;
      return callback(err, hash);
    });
  }

  checkPassword(password, hash, callback) {
    bcrypt.compare(password, hash, (err, result) => callback(err, result));
  }
};
