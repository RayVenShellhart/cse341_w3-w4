const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    //#swagger.tag=['Wishlist']
    const wish = await mongodb
      .getDatabase()
      .db()
      .collection('wishlist')
      .find()
      .toArray();

    res.status(200).json(wish);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching list' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tag=['Wishlist']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use valid wish id to find a wish');
  }

  try {
    const wishId = new ObjectId(req.params.id);
    const wish = await mongodb
      .getDatabase()
      .db()
      .collection('wishlist')
      .findOne({ _id: wishId });

    if (!wish) {
      return res.status(404).json({ message: 'Wish not found' });
    }

    res.status(200).json(wish);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching Wish' });
  }
};

const createWish = async (req, res) => {
  //#swagger.tag=['wish']
  const wish = {
    Name: req.body.Name,
    Developer: req.body.Developer,
    Publisher: req.body.Publisher,
    release: req.body.release,
    Genre: req.body.Genre,
    POV: req.body.POV
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('wishlist')
      .insertOne(wish);

    if (response.acknowledged) {
      return res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create Wish' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error creating Wish' });
  }
};

const updateWish = async (req, res) => {
  //#swagger.tag=['Wish']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use valid id to update');
  }

  const wishId = new ObjectId(req.params.id);
  const wish = {
    Name: req.body.Name,
    Developer: req.body.Developer,
    Publisher: req.body.Publisher,
    release: req.body.release,
    Genre: req.body.Genre,
    POV: req.body.POV
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('wishlist')
      .replaceOne({ _id: wishId }, wish);

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      res
        .status(404)
        .json({ message: 'No wish found to update or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating wish' });
  }
};

const deleteWish = async (req, res) => {
  //#swagger.tag=['wish']
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json('Must use a valid wish id to delete a wish.');
  }

  const wishId = new ObjectId(req.params.id);

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('wishlist')
      .deleteOne({ _id: wishId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    } else {
      res.status(404).json({ message: 'No Wish found to delete' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting wish' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createWish,
  updateWish,
  deleteWish,
};

// Use wishlist not games