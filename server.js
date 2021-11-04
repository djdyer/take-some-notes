const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// API Routes - getting existing notes
app.get("/api/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Allows addition of one new note to existing json
app.post("/api/notes", (req, res) => {
  const notes = readNotes();
  const note = req.body;
  const title = note.title;
  const text = note.text;
  const newNote = { title, text, id: uuid() };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const notes = readNotes();
  const updatedNotes = notes.filter((note) => note.id !== req.params.id);
  writeNotes(updatedNotes);
  res.json({ ok: true });
});

function readNotes() {
  return JSON.parse(fs.readFileSync("./db/notes.json", "utf-8"));
}

function writeNotes(notes) {
  const db = JSON.stringify(notes);
  fs.writeFileSync("./db/notes.json", db, "utf-8");
}

// VIEW ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/404.html"));
});

// Starts server listening on port var
app.listen(PORT, () => console.log(`Listening on port ${PORT}...🚀`));
