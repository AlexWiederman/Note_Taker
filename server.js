const express = require('express');
const path = require('path');
//Make a unique id per creating object to push
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// File structure to keep clean. Handling the post notes
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');
const PORT = process.env.port || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const notesDB = require('./db/db.json')

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// POST Route for notes api
app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      tip_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully!`);
  } else {
    res.error('Error in adding Note');
  }
}
);

// GET Route for notes api
app.get('/api/notes', (req, res) => {
  // res.json(notesDB)
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}
);


// Wildcard route to direct users to the index page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
