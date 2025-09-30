const Note = require("../models/Note");


async function createNote(req, res) {
  try {
    const { title, content, userId } = req.body;
    const note = await Note.create({ title, content, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note", details: error.message });
  }
}


async function getNotes(req, res) {
  try {
    const { userId } = req.query; // optional filter
    const notes = await Note.findAll({
      where: userId ? { userId } : {},
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes", details: error.message });
  }
}


async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note", details: error.message });
  }
}


async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    await note.destroy();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note", details: error.message });
  }
}


module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
