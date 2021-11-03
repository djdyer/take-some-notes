const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/notes.json");
const uuid = require("./helpers/uuid");
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// GET request for root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes.html", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

// app.post("/notes.html", (req, res) => {
//   res.write(JSON(notes.json));
// });

// Starts server listening on port var
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
