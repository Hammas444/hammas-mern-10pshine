const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.post("/", noteController.createNote);     // Create
router.get("/", noteController.getNotes);        // Read all
router.put("/:id", noteController.updateNote);   // Update
router.delete("/:id", noteController.deleteNote);// Delete

module.exports = router;
