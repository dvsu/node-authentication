const authService = require("../services/auth");
const User = require("../models/user");
const SigninUser = require("../models/signin_user");

exports.signup = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await authService.signup(user);
    return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const signinUser = new SigninUser(req.body);
    await authService.signin(signinUser);
    return res.json();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
