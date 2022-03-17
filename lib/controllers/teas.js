const { Router } = require('express');
const Tea = require('../models/Tea');

module.exports = Router().post('/', async (req, res) => {
  const response = await Tea.insert(req.body);
  res.send(response);
});
