const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js');

const PORT = process.env.port || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
const notesDB = requre('./db/db.json')

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
app.post('/api/notes', (req, res) =>
  
);

// GET Route for notes api
app.get('/api/notes', (req, res) =>
res.status(200).json(notesDB);
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
