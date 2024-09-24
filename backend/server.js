const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect(' mongodb://127.0.0.1:27017/stone-paper-scissors', {})
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));



  mongoose.connect('mongodb://127.0.0.1:27017/stone-paper-scissor game')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
  


// Define a schema
const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  rounds: Array,
  winner: String,
});

// Create a model
const Game = mongoose.model('Game', gameSchema);

// API routes
app.post('/api/games', async (req, res) => {
  const newGame = new Game(req.body);
  try {
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
