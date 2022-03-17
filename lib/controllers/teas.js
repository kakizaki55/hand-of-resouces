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
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Tea.findById(req.params.id);
      res.send(response);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const response = await Tea.updateById(req.params.id, req.body);
      res.send(response);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const response = await Tea.deleteById(req.params.id);
      res.send(response);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
