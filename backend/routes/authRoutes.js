
import authMiddleware from "../middleware/authMiddleware.js";
import { register, login, getUsers, updateUser } from "../controllers/authController.js";
import express from "express";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/getUsers",authMiddleware, getUsers);
router.put("/updateUser/:id",authMiddleware, updateUser);

export default router;
