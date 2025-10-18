import request from "supertest";
import assert from "assert";
import app from "../index.js";
import User from "../models/User.js";
import Note from "../models/Note.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = "supersecretkey";


describe("Notes API (CRUD)", function () {
  let createdNoteId;
  let token;

  before(async function () {
    // Clean both tables
    await Note.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create user with id=1 (for FK constraint)
    const user = await User.create({
      id: 1,
      username: "newuser",
      email: "newuser@example.com",
      password: "password",
    });
      token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });

  });

  it("should GET all notes", async function () {
    const res = await request(app).get("/notes").set('Authorization', `Bearer ${token}`);
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  it("should CREATE a new note", async function () {
    const newNote = { title: "Test Note", content: "This is test content" };
    const res = await request(app)
      .post("/notes")
      .set('Authorization', `Bearer ${token}`)
      .send(newNote);

    console.log("Create Note Response:", res.body); // debugging

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.title, "Test Note");
    createdNoteId = res.body.id;
  });

  it("should UPDATE a note", async function () {
    const res = await request(app)
      .put(`/notes/${createdNoteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: "Updated Note" });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.title, "Updated Note");
  });

  it("should DELETE a note", async function () {
    const res = await request(app)
      .delete(`/notes/${createdNoteId}`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.message, "Note deleted successfully");
  });
});