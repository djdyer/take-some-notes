const express = require("express");
const app = express();
const notes = require("./db/db.json");
const fs = require("fs");

// Helper method for generating unique ids
// const uuid = require("./helpers/uuid");

// Enviroment variable
const PORT = 3001;

// GET request for root
app.get("/", (req, res) => {
  res.send("Take Some Notes");
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  res.send(req.params);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
