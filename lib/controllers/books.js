const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router().post('/', async (req, res) => {
  const profile = await Book.insert(req.body);
  res.send(profile);
});
