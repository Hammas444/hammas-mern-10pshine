const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/",authMiddleware,noteController.createNote);     // Create
router.get("/",authMiddleware, noteController.getNotes);        // Read all
router.put("/:id",authMiddleware, noteController.updateNote);   // Update
router.delete("/:id",authMiddleware, noteController.deleteNote);// Delete

module.exports = router;
