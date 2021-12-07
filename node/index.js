const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");

app.use(bodyParser.json());

const tempStorage = [];

app.post("/user/signup", (req, res, next) => {
  let newUser = new User();
  console.log(req.body);
  newUser.name = req.body.name;
  newUser.email = req.body.email;

  if (!req.body.name) {
    return res.status(400).send({
      statusCode: 400,
      message: "Missing username",
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      statusCode: 400,
      message: "Missing email",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      statusCode: 400,
      message: "Missing password",
    });
  }

  newUser.setPassword(req.body.password, (err, hash) => {
    if (!err) tempStorage.push(newUser);
  });

  res.status(201).send({
    statusCode: 201,
    message: "User created",
  });
});

app.post("/user/login", (req, res, next) => {
  // Ideally, user email should be unique,
  // so there should be only one unique email
  // exists in storage
  const loginUser = tempStorage.find(({ email }) => email === req.body.email);

  if (!loginUser) {
    return res.status(400).send({
      statusCode: 400,
      message: "User not found",
    });
  }

  loginUser.checkPassword(req.body.password, loginUser.hash, (err, result) => {
    if (!result) {
      return res.status(400).send({
        statusCode: 400,
        message: "Wrong password",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Login successful",
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
