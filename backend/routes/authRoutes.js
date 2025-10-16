const express = require("express");
const router = express.Router();
const { register, login, getUsers, updateUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers",authMiddleware, getUsers);
router.put("/updateUser/:id",authMiddleware, updateUser);

module.exports = router;
