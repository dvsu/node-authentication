const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/users", adminController.listUsers);

router.get("/users/:userId", adminController.getUserById);

module.exports = router;
