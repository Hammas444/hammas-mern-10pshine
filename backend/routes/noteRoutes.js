
import express from "express";
import noteController from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware,noteController.createNote);     // Create
router.get("/",authMiddleware, noteController.getNotes);        // Read all
router.put("/:id",authMiddleware, noteController.updateNote);   // Update
router.delete("/:id",authMiddleware, noteController.deleteNote);// Delete

export default router;
