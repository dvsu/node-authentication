const adminService = require("../services/admin");

exports.listUsers = async (req, res, next) => {
  try {
    const result = await adminService.listUsers();
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await adminService.getUserById(userId);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: err.message });
  }
};
