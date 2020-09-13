// Import dependencies.
const express = require('express');

// Initialize express app.
const app = express();

//Middleware
app.use(express.json());

// Method for generating ID's
let currentID = 1;
generateMovieID = () => {
  return currentID++;
};

// "Database"
movieDB = [];

// CRUD Routes
app.get('/movies', (req, res) => {
  return res.status(200).json(movieDB);
});

app.get('/movies/:id', (req, res) => {
  const movieID = parseInt(req.params.id);
  const movie = movieDB.find((movie) => movie.id === movieID);
  if (!movie) {
    return res
      .status(404)
      .json({ msg: `Movie with id '${movieID}' does not exist.` });
  }

  return res.status(200).json(movie);
});

app.post('/movies', (req, res) => {
  const { title, length, genre, rating } = req.body;
  const movieID = generateMovieID();
  const newMovie = {
    id: movieID,
    title,
    length,
    genre,
    rating,
  };
  movieDB.unshift(newMovie);

  res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const movieID = parseInt(req.params.id);
  const movie = movieDB.find((movie) => movie.id === movieID);
  console.log(movieDB, '---', movie);
  if (!movie) {
    return res
      .status(404)
      .json({ msg: `Movie with id '${movieID}' does not exist.` });
  }

  const { title, length, genre, rating } = req.body;

  const editedMovie = {
    id: movie.id,
    title,
    length,
    genre,
    rating,
  };
  const editedMovieIndex = movieDB.findIndex((movie) => movie.id === movieID);
  movieDB[editedMovieIndex] = editedMovie;

  return res.status(200).json(editedMovie);
});

app.delete('/movies/:id', (req, res) => {
  const movieID = parseInt(req.params.id);
  const movie = movieDB.find((movie) => movie.id === movieID);
  if (!movie) {
    return res
      .status(404)
      .json({ msg: `Movie with id '${movieID}' does not exist.` });
  }

  // Keep every movie except the one we want to delete.
  movieDB = movieDB.filter((movie) => movie.id != movieID);

  return res
    .status(200)
    .json({ msg: `Movie with id '${movieID}' successfully deleted.` });
});

// Start server, and start listening for requests.
const PORT = 1337;
app.listen(PORT, () => {
  console.log(`🚀 Server listening for requests on port ${PORT}.`);
});
