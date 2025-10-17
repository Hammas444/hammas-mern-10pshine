const Note = require("../models/Note");
const logger = require("pino")({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    logger.info({ user: req.user?.id }, "Creating a new note");

    const note = await Note.create({ 
      title, 
      content, 
      userId: req.user.id 
    });

    logger.info({ noteId: note.id, user: req.user.id , title , content}, "Note created successfully");
    res.status(201).json(note);
  } catch (error) {
    logger.error({ err: error.message, user: req.user?.id }, "Failed to create note");
    res.status(500).json({ error: "Failed to create note", details: error.message });
  }
}


async function getNotes(req, res) {
  try {
    const userId = req.user ? req.user.id : req.query.id;

    logger.info({ user: userId }, "Fetching notes for user");

    const notes = await Note.findAll({
      where: userId ? { userId } : {},
    });

    logger.info({ user: userId, count: notes.length }, "Notes fetched successfully");
    res.json(notes);
  } catch (error) {
    logger.error({ err: error.message, user: req.user?.id }, "Failed to fetch notes");
    res.status(500).json({ error: "Failed to fetch notes", details: error.message });
  }
}


async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    logger.info({ noteId: id, user: req.user?.id  }, "Attempting to update note");

    const note = await Note.findByPk(id);
    if (!note) {
      logger.warn({ noteId: id }, "Note not found");
      return res.status(404).json({ error: "Note not found" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    logger.info({ noteId: id, user: req.user?.id , title , content }, "Note updated successfully");
    res.json(note);
  } catch (error) {
    logger.error({ err: error.message, noteId: req.params.id }, "Failed to update note");
    res.status(500).json({ error: "Failed to update note", details: error.message });
  }
}


async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    logger.info({ noteId: id, user: req.user?.id }, "Attempting to delete note");

    const deletedCount = await Note.destroy({ where: { id, userId: req.user.id } });

    if (deletedCount === 0) {
      logger.warn({ noteId: id, user: req.user?.id }, "Note not found or user not authorized to delete");
      return res.status(404).json({ error: "Note not found or you're not authorized to delete it" });
    }

    logger.info({ noteId: id, user: req.user?.id }, "Note deleted successfully");
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    logger.error({ err: error.message, noteId: req.params.id }, "Failed to delete note");
    res.status(500).json({ error: "Failed to delete note", details: error.message });
  }
}

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
