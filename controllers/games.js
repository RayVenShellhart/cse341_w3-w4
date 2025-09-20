const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    //#swagger.tag=['Games']
    const games = await mongodb
      .getDatabase()
      .db()
      .collection('games')
      .find()
      .toArray();

    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching games' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tag=['Games']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use valid game id to find a game');
  }

  try {
    const gameId = new ObjectId(req.params.id);
    const game = await mongodb
      .getDatabase()
      .db()
      .collection('games')
      .findOne({ _id: gameId });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching game' });
  }
};

const createGame = async (req, res) => {
  //#swagger.tag=['Games']
  const game = {
    Name: req.body.Name,
    Rating: req.body.Rating,
    Developer: req.body.Developer,
    Publisher: req.body.Publisher,
    Genre: req.body.Genre,
    Hours: req.body.Hours,
    POV: req.body.POV
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('games')
      .insertOne(game);

    if (response.acknowledged) {
      return res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create Game' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error creating Game' });
  }
};

const updateGame = async (req, res) => {
  //#swagger.tag=['Game']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use valid id to update');
  }

  const gameId = new ObjectId(req.params.id);
  const game = {
    Name: req.body.Name,
    Rating: req.body.Rating,
    Developer: req.body.Developer,
    Publisher: req.body.Publisher,
    Genre: req.body.Genre,
    Hours: req.body.Hours,
    POV: req.body.POV
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('game')
      .replaceOne({ _id: gameId }, game);

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      res
        .status(404)
        .json({ message: 'No game found to update or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating game' });
  }
};

const deleteGame = async (req, res) => {
  //#swagger.tag=['game']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid game id to delete a game.');
  }

  const gameId = new ObjectId(req.params.id);

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('games')
      .deleteOne({ _id: gameId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    } else {
      res.status(404).json({ message: 'No game found to delete' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting game' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createGame,
  updateGame,
  deleteGame,
};


// Use games not wishlist