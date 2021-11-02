const express = require("express");
const fs = require("fs");

// Helper method for generating unique ids
const uuid = require("./helpers/uuid");

const PORT = 3001;

const app = express();

// GET request for notes
app.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.status(200).json(`${req.method} request received to get notes`);
  
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  });
  