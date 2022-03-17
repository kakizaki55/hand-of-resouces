const { Router } = require('express');
const Tea = require('../models/Tea');

module.exports = Router()
  .post('/', async (req, res) => {
    const response = await Tea.insert(req.body);
    res.send(response);
  })
  .get('/', async (req, res) => {
    const response = await Tea.getAll();
    res.send(response);
  })
  .get('/:id', async (req, res) => {
    const response = await Tea.findById(req.params.id);
    res.send(response);
  });
